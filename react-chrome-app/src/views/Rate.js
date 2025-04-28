import React, { useEffect, useState } from 'react';
import PropertyInformation from '../components/PropertyInformation';
import RatingGenerator from '../components/RatingGenerator';
import { getListingData } from "../api/domain.js";

const Rate = () => {

  const [propertyTitle, setTitle] = useState('');
  const [numBeds, setNumBeds] = useState(1);
  const [numBath, setNumBath] = useState(1);
  const [propertyDescription, setDescription] = useState();
  const [address, setAddress] = useState();
  const [pricePW, setPricePW] = useState(0);
  const [PItrigger, setPITrigger] = useState(false);
  const [rateTrigger, setRateTrigger] = useState(null);
  const [currentURL, setCurrentURL] = useState('');
  const [propertyID, setPropertyID] = useState();
  const [carSpaces, setCarSpaces] = useState();
  const [propertyType, setPropertyType] = useState();
  const [propertyDetails, setPropertyDetails] = useState();

  const [listingData, setListingData] = useState({});

  const [loading, setLoading] = useState(true);

  const [favouriteList, setFavouriteList] = useState(() => {

  const favouriteListLocal = localStorage.getItem("favouriteListStored")
      if (favouriteListLocal == null) return []

      return JSON.parse(favouriteListLocal)
  });

  const [isFavourited, setIsFavourited] = useState()

  // if property ID is generated, call CallDomain
  useEffect(() => {
    if(propertyID){
      callDomainForID();
    }
  }, [propertyID]);

  useEffect(() => {
    const current_domain = window.location.hostname;  // get hostname 
    console.log("the current domain is: " + current_domain);
    const url = window.location.href
    setCurrentURL(url)
    setIsFavourited(favouriteList.some(ing => ing.link === url))

    if(current_domain == 'www.domain.com.au'){      // TODO also check that it is a property page
      const parts = url.split('-');
      const id = parts[parts.length - 1];
      setPropertyID(id) // set property ID 
    }

  }, []);

  function addFavourite(link_input, name_input) {
    const isFoundInThisList = favouriteList.some(ing => ing.link === link_input); // will be true if link is already in list  
    if(!isFoundInThisList){
      setFavouriteList((currentFavourites) => {
          return [
              ...currentFavourites,
              {id: crypto.randomUUID(), name: name_input, link: link_input}
          ]
      })
    }
  }

  useEffect(() => {
    localStorage.setItem("favouriteListStored", JSON.stringify(favouriteList));
  }, [favouriteList]);
  
  function handleNewFavSave() {
      addFavourite(currentURL, address);
      setIsFavourited(true)
  }

  useEffect(() => {
    localStorage.setItem("favouriteListStored", JSON.stringify(favouriteList));
  }, [favouriteList]);

  // start of added 
  useEffect(() => {
    if(listingData && Object.keys(listingData).length > 0){
      console.log(listingData)
      console.log("Retrieved listing data from Domain API")
      console.log("Price is ...", listingData.priceDetails.price)
      if(listingData.priceDetails.price){
        setPricePW(listingData.priceDetails.price)
      }
      else{
        const priceDetailsString = JSON.stringify(listingData.priceDetails);
        const match = priceDetailsString.match(/\$([\d,]+)/);
        //setPricePW(parseInt(priceDetailsString.match(/\$([\d,]+)/)[1].replace(/,/g, ''), 10))
        if (match && match[1]) {
          setPricePW(parseInt(match[1].replace(/,/g, ''), 10));
        } else {
          console.warn("No price found in priceDetails");
          setPricePW(null); // or 0 or some fallback
        }
      }
      if (listingData.description){
        setDescription(listingData.description);
      }
      if (listingData.bedrooms){
        setNumBeds(listingData.bedrooms)
      }
      if (listingData.bathrooms){
        setNumBath(listingData.bathrooms)
      }
      if (listingData.addressParts.displayAddress){
        setAddress(listingData.addressParts.displayAddress)
      }
      if (listingData.carSpaces){
        setCarSpaces(listingData.carspaces)
      }
      if (listingData.propertyTypes[0]){
        setPropertyType(listingData.propertyTypes[0])
      }
      console.log("set values from listing data")
      // TODO add property type 
          // TODO add car spaces and pets 
          //const address = result.addressParts.displayAddress;const geolocation = result.geoLocation;//const carspaces = result.carspaces;//const propertyType = result.propertyTypes[0]; 
    }
  }, [listingData])

  useEffect(() => {
    console.log(pricePW);
    console.log(propertyDescription);
    console.log(numBath);
    console.log(carSpaces)
  }, [pricePW, propertyDescription, numBath, numBeds, carSpaces, propertyType]); // Depends on pricePW, propertyDescription, numBath

      
  const callDomainForID = async () => {
    console.log("inside call for Domain ID")
    try {
      const result = await getListingData(propertyID);
        // If no error, proceed with result
      setListingData(JSON.parse(result));
    } catch (error) {
        // If an error occurs, it will be caught here
      console.log('Failed to fetch listing data from Domain API:', error);
      setListingData(null); // You can choose to handle the error by setting the state to null or another fallback
      inspectDomain();
    }
  }
  // end of added 

  const inspectDomain = async () => {
    console.log("inspecting domain.com")
    setTitle(document.title);
    setDescription(document.title);
    const price = document.querySelector("#__next > div > div > div > div.css-4bd6g2 > div > div > div.css-2anoks > div > div > div.css-1eoy87d > div.css-1ff36h2 > div > span").innerHTML
    if (price){
      setPricePW(price.substring(1,price.length));
    }
    const beds = document.querySelector("#__next > div > div > div > div.css-4bd6g2 > div > div > div.css-2anoks > div > div > div.css-1o7d3sk > div.css-ghc6s4 > div > span:nth-child(1) > span").textContent.trim().replace(/\D/g,'')
    if (beds){
      setNumBeds(beds); 
    }
    const bath = document.querySelector("#__next > div > div > div > div.css-4bd6g2 > div > div > div.css-2anoks > div > div > div.css-1o7d3sk > div.css-ghc6s4 > div > span:nth-child(2) > span").textContent.trim().replace(/\D/g,'')
    if (bath) {
      setNumBath(bath)
    }
    const propertyAddress = document.querySelector("#__next > div > div.css-117u70y > div > div.css-4bd6g2 > div > div > div.css-2anoks > div.css-s4rjyl > div > div.css-1tpe8dy > h1").innerHTML
    if (propertyAddress){
      setAddress(propertyAddress)
    }
    const propertyDesc = document.querySelector("#__next > div > div.css-117u70y > div > div.css-4bd6g2 > div > div > div.css-bq4jj8").textContent

    // const propertyDesc = document.querySelector("#collapsible-panel > div > div > div > h3").innerHTML // note that THIS WORKS FOR HEADLINE DESCRIPTION
    if (propertyDesc){
      setDescription(propertyDesc)
    }
  };

  useEffect(() => {
    setLoading(false)
  }, [propertyTitle, pricePW, currentURL, numBeds, numBath, address, propertyDescription]); // This will run when propertyTitle changes
  
  // currently PI and RG and storing and retrieiving values simultaneously so you need to click twice .. need to fix .. not a big deal rn 
  const pullRatingTrigger = () => {
    setPITrigger(!PItrigger);

    // could potentially do a use effect here so we automatically update price pw and num beds and then only setRateTrigger when the values are updated 
    // would look like - use effect ... [pricePW, numBeds]

    // download all variables so they can be passed into RatingGenerator
    const savedPricePW = localStorage.getItem('pricePWStored');
    const savedNumBeds = localStorage.getItem('numBedsPIStored')
    const savedPropertyDesc = localStorage.getItem('propertyInputStored')
    const savedPropertyDetails = localStorage.getItem('propertyDetailsStored')

    if (savedPricePW) {
      setPricePW(savedPricePW);
    }
    else{
      setPricePW(0);
    }

    if (savedNumBeds){
      setNumBeds(savedNumBeds);
    }
    else{
      setNumBeds(0)
    }
    if (savedPropertyDesc){
      setDescription(savedPropertyDesc)
    }
    else{
      setDescription("")
    }
    if (rateTrigger == null){
      setRateTrigger(false)
    }
    else{
      setRateTrigger(!rateTrigger);
    }
    if(savedPropertyDetails){
      setPropertyDetails(savedPropertyDetails)
    }

  };

  return (
    <div>      {loading ? (
      <div>Loading...</div> 
    ) : (
    <div>
      <header>
        <div class="propertyTitle">{propertyTitle != '' && propertyTitle}</div>
      </header>
      <div><PropertyInformation trigger ={PItrigger} desc = {propertyDescription} beds = {numBeds} price = {pricePW} bath={numBath} propertyAddress={address} cars={carSpaces} propType={propertyType}/></div>
      <button className="vibrantButton" onClick={pullRatingTrigger}>Generate Rating</button>
      <div><RatingGenerator trigger ={rateTrigger} pricePW={pricePW} propertyNumBeds={numBeds} numBath={numBath} propertyURL={currentURL} propertyDescription={propertyDescription} propertyAddress={address} detailedRating={true} propertyID={propertyID} propertyDetails={propertyDetails}/></div>
      <br></br>
      {!isFavourited && <div> <button className="buttonStyle" onClick={handleNewFavSave}>Save Property</button> </div>}
    </div>
    )}
    </div>
  );
};

export default Rate;