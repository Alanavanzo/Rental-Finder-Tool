import React, { useEffect, useState } from 'react';
import { getListingData } from "../api/domain.js";
import RatingGenerator from './RatingGenerator';

const IndividualDomainRating = ({propertyID}) => {

    console.log("inside individual domain rating")

    const [listingData, setListingData] = useState({});
    const [displayRating, setDisplayRating] = useState(false)
    const [price, setPrice] = useState();
    const [bedrooms, setBedrooms] = useState();
    const [bathrooms, setBathrooms] = useState();
    const [propertyDescription, setPropertyDescription] = useState();

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
      if(Object.keys(listingData).length > 0){
        console.log("hey")
        console.log("got listing data")
        console.log(listingData)
        console.log("Type of listingData:", typeof listingData);  // For primitives (e.g., 'object', 'string', etc.)

        console.log("Objective: ", listingData.objective)
        //console.log("Price details: ", listingData.priceDetails.price)
        setPrice(listingData.priceDetails.price)
        setPropertyDescription(listingData.description);
        setBedrooms(listingData.bedrooms)
        setBathrooms(listingData.bathrooms)
        setDisplayRating(true); 
          //const address = result.addressParts.displayAddress;
        //const geolocation = result.geoLocation;
        //const carspaces = result.carspaces;
        //const propertyType = result.propertyTypes[0]; 
      }
    }, [listingData])
    
  const callDomainForID = async () => {
    //const id = "17236188"
    const result = await getListingData(propertyID)
    setListingData(JSON.parse(result))
    console.log("set listing data")
    }


  return (
    <div >
      { displayRating && <div><RatingGenerator trigger ={true} pricePW={price} propertyNumBeds={bedrooms} numBath={bathrooms} propertyDescription={propertyDescription}/></div>}
  </div>
  );
};

export default IndividualDomainRating;