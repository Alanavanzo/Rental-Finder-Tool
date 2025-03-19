import React, { useEffect, useState } from 'react';
import PropertyInformation from '../components/PropertyInformation';
import RatingGenerator from '../components/RatingGenerator';

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

  const [loading, setLoading] = useState(true);

  const [favouriteList, setFavouriteList] = useState(() => {

  const favouriteListLocal = localStorage.getItem("favouriteListStored")
    if (favouriteListLocal == null) return []

    return JSON.parse(favouriteListLocal)
  });

  const [isFavourited, setIsFavourited] = useState()

  useEffect(() => {
    /// TODO grab url as we will pass this into the AI 
    const current_domain = window.location.hostname;  // get hostname 
    console.log("the current domain is: " + current_domain);
    if(current_domain == 'www.domain.com.au'){      // TODO also check that it is a property page
      inspectDomain();
    }
    const url = window.location.href
    setCurrentURL(url)
    setIsFavourited(favouriteList.some(ing => ing.link === url))
    // check for domain.com (will add real-estate later)

  }, []);

  useEffect(() => {
    console.log("url retrieved")
    console.log(currentURL)

    // check for domain.com (will add real-estate later)

  }, [currentURL]);

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
      addFavourite(currentURL, propertyTitle);
      setIsFavourited(true)
  }

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

  };

  return (
    <div>      {loading ? (
      <div>Loading...</div> 
    ) : (
    <div>
      <header>
        <h3>Here, you can enter property info and based off of your preferences a rating will be generated!</h3>
        <br></br>
        <h2>{propertyTitle != '' && propertyTitle}</h2>
      </header>
      <div><PropertyInformation trigger ={PItrigger} desc = {propertyDescription} beds = {numBeds} price = {pricePW} bath={numBath} propertyAddress={address}/></div>
      <button className="buttonStyle" onClick={pullRatingTrigger}>Generate Rating</button>
      <div><RatingGenerator trigger ={rateTrigger} pricePW={pricePW} propertyNumBeds={numBeds} numBath={numBath} propertyURL={currentURL} propertyDescription={propertyDescription}/></div>
      {!isFavourited && <div> <button className="buttonStyle" onClick={handleNewFavSave}>Save Property</button> </div>}
    </div>
    )}
    </div>
  );
};

export default Rate;