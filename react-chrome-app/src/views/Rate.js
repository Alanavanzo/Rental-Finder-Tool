import React, { useEffect, useState } from 'react';
import PropertyInformation from '../components/PropertyInformation';
import RatingGenerator from '../components/RatingGenerator';
//import axios from 'axios';
//import { Cheerio } from 'cheerio';

//const axios = require('axios');
//const cheerio = require('cheerio');

const Rate = () => {

  const [propertyTitle, setTitle] = useState('');

  const [numBeds, setBeds] = useState();

  const [propertyDescription, setDescription] = useState();

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const current_domain = window.location.hostname;  // get hostname 
    console.log(current_domain);
    // TODO also check that it is a property page
    if(current_domain == 'www.domain.com.au'){
      console.log("At domain.com");
      inspectDomain();
    }

    // check for domain.com (will add real-estate later)

  }, []);

  const inspectDomain = async () => {
    setTitle(document.title);
    setDescription(document.title);
    console.log(propertyDescription);
    console.log(propertyTitle);

    console.log(document.querySelector("#__next > div > div.css-1ktrj7 > div > div.css-4bd6g2 > div > div > div.css-bq4jj8"));
    console.log(document.querySelector("#__next > div > div.css-1ktrj7 > div > div.css-4bd6g2 > div > div > div.css-bq4jj8 > #collapsible-panel > div > div > div > p:nth-child(2)"));
    console.log(document.querySelector("#__next > div > div.css-1ktrj7 > div > div.css-4bd6g2 > div > div > div.css-bq4jj8 > #collapsible-panel"));
    setDescription(document.querySelector("#__next > div > div.css-1ktrj7 > div > div.css-4bd6g2 > div > div > div.css-bq4jj8 > #collapsible-panel > div > div > div > p:nth-child(2)").innerHTML);

    console.log(document.querySelector("#__next > div > div.css-1ktrj7 > div > div.css-4bd6g2 > div > div > div.css-2anoks > div.css-s4rjyl > div > div.css-1dtnjt5 > div.css-ghc6s4 > div > span:nth-child(1) > span"));
    //setBeds(document.querySelector("#__next > div > div.css-1ktrj7 > div > div.css-4bd6g2 > div > div > div.css-2anoks > div.css-s4rjyl > div > div.css-1dtnjt5 > div.css-ghc6s4 > div > span:nth-child(1) > span").innerHTML);
    setBeds(document.querySelector("#__next > div > div.css-1ktrj7 > div > div.css-4bd6g2 > div > div > div.css-2anoks > div.css-s4rjyl > div > div.css-1dtnjt5 > div.css-ghc6s4 > div > span:nth-child(1) > span").childNodes[0].nodeValue.trim());
    //setBeds(document.querySelector("#__next > div > div.css-1ktrj7 > div > div.css-4bd6g2 > div > div > div.css-2anoks > div.css-s4rjyl > div > div.css-1dtnjt5 > div.css-ghc6s4 > div > span:nth-child(1) > span").innerHTML)
  };
  
  // currently PI and RG and storing and retrieiving values simultaneously so you need to click twice .. need to fix .. not a big deal rn 
  const pullRatingTrigger = () => {
    setTrigger(!trigger);
  };
  
  return (
    <div>
      <header>
        <h3>Here, you can enter property info and based off of your preferences a rating will be generated!</h3>
        <br></br>
        <h2>{propertyTitle != '' && propertyTitle}</h2>
      </header>
      <div><PropertyInformation trigger ={trigger} desc = {propertyDescription} beds = {numBeds}/></div>
      <button className="buttonStyle" onClick={pullRatingTrigger}>Generate Rating</button>
      <div><RatingGenerator trigger ={trigger}/></div>
    </div>
  );
};

// Export the component
export default Rate;