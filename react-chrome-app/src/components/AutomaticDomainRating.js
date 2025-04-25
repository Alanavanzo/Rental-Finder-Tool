import React, { useEffect, useState } from 'react';
import { getListingData } from "../api/domain.js";
import RatingGenerator from './RatingGenerator';
import StarRating from './StarRating.js';

const IndividualDomainRating = ({propertyID, ratingList}) => {

    console.log("inside individual domain property")
    console.log("printing rating list", ratingList)

    const [listingData, setListingData] = useState({});
    const [displayRating, setDisplayRating] = useState(false)
    const [price, setPrice] = useState();
    const [bedrooms, setBedrooms] = useState();
    const [bathrooms, setBathrooms] = useState();
    const [propertyDescription, setPropertyDescription] = useState();
    const [address, setAddress] = useState(null);

    const [trigger, setTrigger] = useState(null);
    const [noRating, setNoRating] = useState(null);

    const [ratingExists, setRatingExists] = useState(null)
    const [propertyScore, setScore] = useState(0);

    

    // TODO - this check should only be needed from where we end up calling this from
    // note it will be called in a loop
    useEffect(() => {
      const current_domain = window.location.hostname;  // get hostname 
      console.log("the current domain is: " + current_domain);
      if(current_domain == 'www.domain.com.au'){      // TODO also check that it is a property page
        console.log("in domain")
        callDomainForID();
      }
    }, []);

    useEffect(() => {
      if(listingData && Object.keys(listingData).length > 0){
        console.log("Retrieved listing data from Domain API")
        if(listingData.priceDetails.price){
          setPrice(listingData.priceDetails.price)
        }
        else{
          const priceDetailsString = JSON.stringify(listingData.priceDetails);
          setPrice(parseInt(priceDetailsString.match(/\$([\d,]+)/)[1].replace(/,/g, ''), 10))
        }
        setPropertyDescription(listingData.description);
        setBedrooms(listingData.bedrooms)
        setBathrooms(listingData.bathrooms)
        setDisplayRating(true); 
        setAddress(listingData.addressParts.displayAddress);
        setTrigger(true);
        //const address = result.addressParts.displayAddress;const geolocation = result.geoLocation;//const carspaces = result.carspaces;//const propertyType = result.propertyTypes[0]; 
      }
    }, [listingData])

    useEffect(() => {
      if(propertyID || address && (ratingList != [] && ratingList.length != 0)){ // only go in when address is not null
        console.log("checking if a rating for this property has been generated")
        console.log(ratingList)
        console.log(address)
        const foundItem = ratingList.find(ing => ing.property === address || ing.property === propertyID);
        if(foundItem){
          const existingScore = foundItem.score;
          console.log("Found item with score:", existingScore);
          setRatingExists(true)
          setScore(existingScore)
          }
        else{
          console.log("no rating found")
          setRatingExists(false)
        }
      }
    }, []);  
    
  const callDomainForID = async () => {
    //const result = await getListingData(propertyID)
    //setListingData(JSON.parse(result))
    try {
      const result = await getListingData(propertyID);
      // If no error, proceed with result
      setListingData(JSON.parse(result));
    } catch (error) {
      // If an error occurs, it will be caught here
      console.log('Failed to fetch listing data from Domain API:', error);
      setListingData(null); // You can choose to handle the error by setting the state to null or another fallback
      setNoRating(true);
    }
  }


  return (
    <div>
    {
      ratingExists == false ? (
        <div>
          <RatingGenerator
            pricePW={price}
            propertyNumBeds={bedrooms}
            numBath={bathrooms}
            propertyDescription={propertyDescription}
            propertyAddress={address}
            automaticRating={true}
            propertyID={propertyID}
          />
        </div>
      ) : (
        <div>
          <StarRating
            score={propertyScore}
          />
        </div>
      )
    }  
    </div>  
  );
};

export default IndividualDomainRating;