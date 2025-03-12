import React, { useEffect, useState } from 'react';
import LocationInfo from './LocationInfo';
import { getRatingValues, getUserRating } from "../api/openai";

const RatingGenerator = ({trigger, pricePW, propertyNumBeds, numBath, propertyDescription, propertyURL}) => {
    const [ratingPoints, setRatingPoints] = useState(10);  // start ff with 0 rating points 

    const [rating, setRating] = useState();
    
    const [thumbsUp, setThumbsUp] = useState();

    const [propertyDetailResponse, setPropertyDetailResponse] = useState();

    const [userRatingResponse, setUserRatingResponse] = useState('')

    const [showRating, setShowRating] = useState(false)

    const [loading, setLoading] = useState(false)

    //const [propertyInput, setPropertyInput] = useState('');

    //const [pricePW, setPricePW] = useState(0);

    //const [location, setLocation] = useState('');

    //const [propertyNumBeds, setPropertyNumBeds] = useState(0);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
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
        generateRating(); //---> instead do use effect so it is only called after property details are retrieved from google maps API

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
      // Round the score to the nearest half
      let fullStars = Math.floor(score);  // Get the full stars (e.g., 3 for 3.5)
      let halfStar = (score % 1 >= 0.5) ? 1 : 0;  // If score is >= 0.5, add a half star
  
      // Generate the rating string with full stars, half stars, and empty stars
      let rating = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(5 - fullStars - halfStar);
  
      // Log or use the rating
      console.log(rating); // For example, log it or use it as needed
  
      // Return the rating (if needed)
      return rating;
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
        const data = await getUserRating(propertyDescription, `I like gardens, my budget is $${String(budget)} per week. I require ${String(numBeds)} bedrooms.I love cooking`);
        setUserRatingResponse(data); // Set the response message from the API
        setRating(setRatingStars(userRatingResponse))

      } catch (error) {
        setRating("Error generating rating :( enter more info or try again later");
      }

      setLoading(false)
      setShowRating(true)

      // If it's a thumbs up, they have rating points to lose based on preferences, at a minimum of 2.5 points 
      // if thumbs down, they have rating points to gain at a maximum of 2.5 points 
      // may be better to do percentage rather than stars 

      /* Use a location API to implement rating based on the rest of the preferences being treated equally */
      
    }
  
  
  return (
    <div>
      <LocationInfo/> {/* this is just for testing purposes .. will remove later */}
      {loading && <div> loading ... </div> }
      {showRating && <div>
      <h2>{thumbsUp ? '👍' : '👎'}</h2>
      <h2>{rating}</h2></div>}
    </div>
  );
};

// Export the component
export default RatingGenerator;