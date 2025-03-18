import React, { useEffect, useState } from 'react';
import LocationInfo from './LocationInfo';
import { getRatingValues, getUserRating } from "../api/openai";
import halfStar from '../styling/images/halfStar.png';
import fullStar from '../styling/images/fullStar.png';
import emptyStar from '../styling/images/emptyStar.png';

const RatingGenerator = ({trigger, pricePW, propertyNumBeds, numBath, propertyDescription, propertyURL}) => {
    //const halfStarHardcoded = chrome.runtime.getURL('assets/images/halfStar.c2ad59ae6c05240fc71ac233d79ccc2e.png');
    const halfStarURL = chrome.runtime.getURL(halfStar);
    const fullStarURL = chrome.runtime.getURL(fullStar);
    const emptyStarURL = chrome.runtime.getURL(emptyStar);
    const [ratingPoints, setRatingPoints] = useState();  // start ff with 0 rating points 

    const [rating, setRating] = useState();
    
    const [thumbsUp, setThumbsUp] = useState();

    const [propertyDetailResponse, setPropertyDetailResponse] = useState();

    const [userRatingResponse, setUserRatingResponse] = useState()

    const [showRating, setShowRating] = useState(false)

    const [loading, setLoading] = useState(false)

    //const [propertyInput, setPropertyInput] = useState('');

    //const [pricePW, setPricePW] = useState(0);

    //const [location, setLocation] = useState('');

    //const [propertyNumBeds, setPropertyNumBeds] = useState(0);
    useEffect(() => {    
      setLoading(false)
      setShowRating(true)
    }, [ratingPoints]);

    useEffect(() => {
      console.log(halfStar)
      console.log("printed half star")
      /*
      // retrieve local storage values
      //const executeAfterDelay = async () => {
        //await delay(3);  // waits 3 seconds for values in PI to be stored.. ideally would trigger automatically once these values are stored but this should be fine for now as it is only a temporary solution
        //console.log("went through")
        const savedPricePW = localStorage.getItem('pricePWStored');
        const savedLocation = localStorage.getItem('propertyLocationStored');
        const savedPI = localStorage.getItem('propertyInputStored');
        const savedPropertyNumBeds = localStorage.getItem('numBedsPIStored')
        if (savedPricePW) {
          setPricePW(savedPricePW);
        }

        if (savedLocation){
          setLocation(savedLocation);
        }

        if (savedPI){
          setPropertyInput(savedPI);
        }

        if (savedPropertyNumBeds){
          setPropertyNumBeds(savedPropertyNumBeds);
        }

        console.log("Price: " + pricePW);
        console.log("Property: " + propertyInput);
        console.log("Location: " + location);
      //};

      //executeAfterDelay;
      */

        //getPropertyDetails();
        if (trigger != null){
          generateRating(); //---> instead do use effect so it is only called after property details are retrieved from google maps API
        }
      // generate a rating 
    }, [trigger]);

    /*
    useEffect(() => {
        // TODO transfer response to json and set all variales .. can pass them into generate rating to make things easier and use less storage 
        if (propertyDetailResponse!== undefined){
          console.log(propertyDetailResponse)
          let data = JSON.parse(propertyDetailResponse);
          //console.log("This is the JSON: " + data)
          
          // Now you can access each factor easily
          let cooking = data.cooking;
          let garden = data.garden;
          let space = data.space;
          let accessibility = data.accessibility;
          let comfort = data.comfort;
          let maintenance = data.maintenance;
          let privacy = data.privacy;
          let location = data.location;
          let aesthetics = data.aesthetics;
          
          console.log("Cooking Score:", cooking);
          console.log("Garden Score:", garden);
          console.log("Space Score:", space);
          console.log("Accessibility Score:", accessibility);
          console.log("Comfort Score:", comfort);
          console.log("Maintenance Score:", maintenance);
          console.log("Privacy Score:", privacy);
          console.log("Location Score:", location);
          console.log("Aesthetics Score:", aesthetics);
        }
        generateRating();
    }, [propertyDetailResponse]);
    */
    
    const getPropertyDetails = async () => {
      console.log("Getting property details inside rating generator .. ")
      console.log("Sending request to backend ...");

      try {
        // Call the API via getChatResponse with the userInput
        const data = await getRatingValues(propertyDescription);
        //const data = await getRatingValues(propertyURL);  // Pass userInput directly
        setPropertyDetailResponse(data); // Set the response message from the API

      } catch (error) {
        setPropertyDetailResponse("Error getting response from backend.");
      }
    };

    /*
    Generate ratings 
    */

    function setRatingStars(score) {
      let fullStars = Math.floor(score);  // Get the full stars
      let halfStar = (score % 1 >= 0.5) ? 1 : 0;  // Add a half star if score >= 0.5
      let emptyStars = 5 - fullStars - halfStar;
  
      // Create an array of image elements for each star
      let stars = [];
  
      // Add full stars
      for (let i = 0; i < fullStars; i++) {
        stars.push(<img key={`full-${i}`} src={fullStarURL} alt="Full Star" />);
      }
  
      // Add half star
      if (halfStar) {
        stars.push(<img key="half" src={halfStarURL} alt="Half Star" />);
      }
  
      // Add empty stars
      for (let i = 0; i < emptyStars; i++) {
        stars.push(<img key={`empty-${i}`} src={emptyStarURL} alt="Empty Star" />);
      }
  
      return stars;
    }

    const generateRating = async () => {
      setLoading(true)
      console.log("inside rating function")
      console.log("retrieved price is: " + pricePW)
      console.log("retrieved beds is: " + propertyNumBeds)
      const budget = localStorage.getItem('userBudgetMaxStored');
      const numBeds = localStorage.getItem('userNumBedsStored');
      console.log("inside generate rating function");

      /* Requirements .. if all good return 3 stars OR just do thumbs up 
         Firm requirements include:
          - Max Budget
          - Min number bedrooms 
          - If they definitely have a pet 
      */ 
      if (pricePW > budget && numBeds > propertyNumBeds){
        setThumbsUp(false);
        //setRating('☆☆☆☆☆');
      }
      else{
        //setRating('★★★★★')
        setThumbsUp(true)
      }

      try {
        // TODO pass in whethe the property meets requirement sand change API to call to max 2/5 stars if no meets requirements 
        const userYesNoAnswers = localStorage.getItem('userYesNoAnswers');
        console.log(userYesNoAnswers)
        const data = await getUserRating(propertyDescription, `I like gardens, my budget is $${String(budget)} per week. Here are my answers to a survey, they should tell you more about my preferences: ${String(userYesNoAnswers)}. I require ${String(numBeds)} bedrooms.I love cooking`);
        setUserRatingResponse(data); // Set the response message from the API
        console.log("The score is: " + userRatingResponse)
        setRating(setRatingStars(userRatingResponse))

      } catch (error) {
        setRating("Error generating rating :( enter more info or try again later");
      }
      // If it's a thumbs up, they have rating points to lose based on preferences, at a minimum of 2.5 points 
      // if thumbs down, they have rating points to gain at a maximum of 2.5 points 
      // may be better to do percentage rather than stars 

      /* Use a location API to implement rating based on the rest of the preferences being treated equally */
      
    }
  
  
  return (
    <div>
      <LocationInfo/> {/* this is just for testing purposes .. will remove later */}
      {loading == true && <div> loading ... </div> }
      {showRating == true && <div>
      <h2>{thumbsUp ? '👍' : '👎'}</h2>
      <h2>{rating}</h2></div>
      }
    </div>
  );
};

// Export the component
export default RatingGenerator;