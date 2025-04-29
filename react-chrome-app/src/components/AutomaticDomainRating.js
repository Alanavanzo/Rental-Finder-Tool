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
    const [propertyType, setPropertyType] = useState();
    const [carSpaces, setCarSpaces] = useState();

    const [trigger, setTrigger] = useState(null);
    const [noRating, setNoRating] = useState(null);

    const [ratingExists, setRatingExists] = useState(null)
    const [propertyScore, setScore] = useState(0);

    const [propertyDetails, setPropertyDetails] = useState();

    
    useEffect(() => {
      const current_domain = window.location.hostname;  // get hostname 
      console.log("the current domain is: " + current_domain);
      if(current_domain == 'www.domain.com.au'){      // TODO also check that it is a property page
        console.log("in domain")
        callDomainForID();
      }
    }, []);

    // only enter of listing data has been retrieved 
    useEffect(() => {
      if(listingData && Object.keys(listingData).length > 0){
        console.log("Retrieved listing data from Domain API - ", listingData)
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
        if (listingData.carSpaces){
          setCarSpaces(listingData.carspaces)
        }
        if (listingData.propertyTypes[0]){
          setPropertyType(listingData.propertyTypes[0])
        }
        setAddress(listingData.addressParts.displayAddress);
        //const address = result.addressParts.displayAddress;const geolocation = result.geoLocation;//const carspaces = result.carspaces;//const propertyType = result.propertyTypes[0]; 
      }
    }, [listingData])
  
    // enter once address has been filled 
    useEffect(() => {
      if (address){
      const tempPropertyDetails = {
        pricePW: price,
        address: address,
        numBeds: bedrooms,
        propertyType: propertyType,
        numBath: bathrooms,
        carSpaces: carSpaces
      };
      setPropertyDetails(JSON.stringify(tempPropertyDetails))
      setTrigger(true);
    }
    }, [address])

    useEffect(() => {
      if(propertyID || address && (ratingList != [] && ratingList.length != 0)){ // only go in when address is not null
        console.log("checking if a rating for this property has been generated in this rating list - ", ratingList)
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
    try {
      const result = await getListingData(propertyID);
      setListingData(JSON.parse(result));       // If no error, proceed with result
    } catch (error) {
      console.log('Failed to fetch listing data from Domain API:', error);
      setListingData(null);
      setNoRating(true);
    }
  }

// trigger added to ensure ratingGenerator only called once all property data has been pulled 
  return (
    <div>
    {
      trigger && ratingExists == false ? (
        <div>
          <RatingGenerator
            pricePW={price}
            propertyNumBeds={bedrooms}
            numBath={bathrooms}
            propertyDescription={propertyDescription}
            propertyAddress={address}
            automaticRating={true}
            propertyID={propertyID}
            propertyDetails={propertyDetails}
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