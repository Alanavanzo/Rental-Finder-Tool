import React, { useEffect, useState } from 'react';
import PropertyInformation from '../components/PropertyInformation';
import RatingGenerator from '../components/RatingGenerator';

const Rate = () => {

  const [propertyTitle, setTitle] = useState('');
  const [numBeds, setNumBeds] = useState(0);
  const [propertyDescription, setDescription] = useState();
  const [pricePW, setPricePW] = useState(0);
  const [PItrigger, setPITrigger] = useState(false);
  const [rateTrigger, setRateTrigger] = useState(false);
  const [currentURL, setCurrentURL] = useState('');

  useEffect(() => {
    const current_domain = window.location.hostname;  // get hostname 
    console.log("the current domain is: " + current_domain);
    if(current_domain == 'www.domain.com.au'){      // TODO also check that it is a property page
      inspectDomain();
    }

    // check for domain.com (will add real-estate later)

  }, []);

  const inspectDomain = async () => {
    console.log("inspecting domain.com")
    console.log(document.title)
    console.log(document)
    console.log(document.querySelector('a'))
    console.log("troed t print")
    setTitle(document.title);
    console.log(propertyTitle)
    setDescription(document.title);
    setNumBeds(document.querySelector("#__next > div > div.css-1ktrj7 > div > div.css-4bd6g2 > div > div > div.css-2anoks > div.css-s4rjyl > div > div.css-1dtnjt5 > div.css-ghc6s4 > div > span:nth-child(1) > span").childNodes[0].nodeValue.trim());
    const price = document.querySelector("#__next > div > div > div > div.css-4bd6g2 > div > div > div.css-2anoks > div > div > div.css-1eoy87d > div.css-1ff36h2 > div > span")
    console.log("THis is the address i think -- > " + document.querySelector("#__next > div > div > div > header > div.css-1b510m5 > div.css-b1dmbj > div > div > nav > ul > li:nth-child(7) > span > span"))
    const addressElement = document.querySelector("#__next > div > div > div > header > div.css-1b510m5 > div.css-b1dmbj > div > div > nav > ul > li:nth-child(7) > span > span");
    console.log(addressElement); // This will show the element or null if it doesn't exist
    if (price){
      setPricePW(price.substring(1,price.length));
    }

  };

  useEffect(() => {
    console.log(propertyTitle); // This will log the updated propertyTitle after state changes
  }, [propertyTitle]); // This will run when propertyTitle changes
  
  // currently PI and RG and storing and retrieiving values simultaneously so you need to click twice .. need to fix .. not a big deal rn 
  const pullRatingTrigger = () => {
    setPITrigger(!PItrigger);

    // could potentially do a use effect here so we automatically update price pw and num beds and then only setRateTrigger when the values are updated 
    // would look like - use effect ... [pricePW, numBeds]

    // download all variables so they can be passed into RatingGenerator
    const savedPricePW = localStorage.getItem('pricePWStored');
    const savedNumBeds = localStorage.getItem('numBedsPIStored')

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

    console.log("Price per week: " + pricePW)
    console.log("Num Beds: " + numBeds)

    setRateTrigger(!rateTrigger);

  };

  return (
    <div>
      <header>
        <h3>Here, you can enter property info and based off of your preferences a rating will be generated!</h3>
        <br></br>
        <h2>{propertyTitle != '' && propertyTitle}</h2>
      </header>
      <div><PropertyInformation trigger ={PItrigger} desc = {propertyDescription} beds = {numBeds} price = {pricePW}/></div>
      <button className="buttonStyle" onClick={pullRatingTrigger}>Generate Rating</button>
      <div><RatingGenerator trigger ={rateTrigger} pricePW={pricePW} propertyNumBeds={numBeds}/></div>
    </div>
  );
};

export default Rate;