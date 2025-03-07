import React, { useEffect, useState } from 'react';
import PropertyInformation from '../components/PropertyInformation';
import RatingGenerator from '../components/RatingGenerator';

const Rate = () => {

  const [propertyTitle, setTitle] = useState('');
  const [numBeds, setNumBeds] = useState(1);
  const [numBath, setNumBath] = useState(1);
  const [propertyDescription, setDescription] = useState();
  const [pricePW, setPricePW] = useState(0);
  const [PItrigger, setPITrigger] = useState(false);
  const [rateTrigger, setRateTrigger] = useState(false);
  const [currentURL, setCurrentURL] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /// TODO grab url as we will pass this into the AI 
    const current_domain = window.location.hostname;  // get hostname 
    console.log("the current domain is: " + current_domain);
    if(current_domain == 'www.domain.com.au'){      // TODO also check that it is a property page
      inspectDomain();
    }
    const url = window.location.href
    setCurrentURL(url)

    // check for domain.com (will add real-estate later)

  }, []);

  useEffect(() => {
    console.log("url retrieved")
    console.log(currentURL)

    // check for domain.com (will add real-estate later)

  }, [currentURL]);

  const inspectDomain = async () => {
    console.log("inspecting domain.com")
    setTitle(document.title);
    setDescription(document.title);
    //setNumBeds(document.querySelector("#__next > div > div.css-1ktrj7 > div > div.css-4bd6g2 > div > div > div.css-2anoks > div.css-s4rjyl > div > div.css-1dtnjt5 > div.css-ghc6s4 > div > span:nth-child(1) > span").childNodes[0].nodeValue.trim());
    console.log("test print")
    const parentElement = document.querySelector("#__next > div > div > div > div.css-4bd6g2");
    console.log(parentElement); // Check if the parent element exists

    const price = document.querySelector("#__next > div > div > div > div.css-4bd6g2 > div > div > div.css-2anoks > div > div > div.css-1eoy87d > div.css-1ff36h2 > div > span").innerHTML
    if (price){
      setPricePW(price.substring(1,price.length));
    }

    console.log("UP TO BEDS ")

    const beds = document.querySelector("#__next > div > div > div > div.css-4bd6g2 > div > div > div.css-2anoks > div > div > div.css-1o7d3sk > div.css-ghc6s4 > div > span:nth-child(1) > span").textContent.trim().replace(/\D/g,'')
    if (beds){
      setNumBeds(beds); 
    }
    const bath = document.querySelector("#__next > div > div > div > div.css-4bd6g2 > div > div > div.css-2anoks > div > div > div.css-1o7d3sk > div.css-ghc6s4 > div > span:nth-child(2) > span").textContent.trim().replace(/\D/g,'')
    if (bath) {
      setNumBath(bath)
    }
  };

  useEffect(() => {
    console.log(propertyTitle); // This will log the updated propertyTitle after state changes
    console.log("Price: " + pricePW)
    console.log("Number of beds: " + numBeds)
    console.log("Number of baths: " + numBath)
    console.log("completed printing")
    setLoading(false)
  }, [propertyTitle, pricePW, currentURL, numBeds, numBath]); // This will run when propertyTitle changes
  
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
    <div>      {loading ? (
      <div>Loading...</div> // You can replace this with a loading spinner or other UI
    ) : (
    <div>
      <header>
        <h3>Here, you can enter property info and based off of your preferences a rating will be generated!</h3>
        <br></br>
        <h2>{propertyTitle != '' && propertyTitle}</h2>
      </header>
      <div><PropertyInformation trigger ={PItrigger} desc = {propertyDescription} beds = {numBeds} price = {pricePW} bath={numBath}/></div>
      <button className="buttonStyle" onClick={pullRatingTrigger}>Generate Rating</button>
      <div><RatingGenerator trigger ={rateTrigger} pricePW={pricePW} propertyNumBeds={numBeds}/></div>
    </div>
    )}
    </div>
  );
};

export default Rate;