import React, { useEffect, useState } from 'react';
import LocationInfo from './LocationInfo';
import { getRatingValues, getUserRating } from "../api/openai";
import halfStar from '../styling/images/halfStar.png';
import fullStar from '../styling/images/fullStar.png';
import emptyStar from '../styling/images/emptyStar.png';

/*
A function which generates a property rating relative the the user.

This function takes property data as input to ensure that the code is extenable for various methods of retrieiving property data.
Hence, it is not reliant on an individual rental site to work, but can be leveraged when exten ding to an additional website.
It is currently being accessed from the rate tab in the sidebar, where users input data, and as a WIP being accessed from domain wider 
rental search pages.

Note that all use effects require checking trigger is not null, as this indicates it is not page load
In all other cases, the trigger is pulled when "generate rating" is selected
*/
const RatingGenerator = ({trigger, pricePW, propertyNumBeds, numBath, propertyDescription, propertyURL}) => {
    const halfStarURL = chrome.runtime.getURL(halfStar);
    const fullStarURL = chrome.runtime.getURL(fullStar);
    const emptyStarURL = chrome.runtime.getURL(emptyStar);

    const [rating, setRating] = useState();
    const [thumbsUp, setThumbsUp] = useState();
    const [userRatingResponse, setUserRatingResponse] = useState()
    const [showRating, setShowRating] = useState(false)
    const [loading, setLoading] = useState(false)
    const [sameResponse, setSameResponse] = useState(false)

    useEffect(() => {
        if (trigger != null){
          console.log("Generating rating ...")
          generateRating(); //---> instead do use effect so it is only called after property details are retrieved from google maps API
        }
    }, [trigger]);

    // this needs to run if the rating changes OR if the generate rating button was selected but the score stays the same
    useEffect(() => {  
      if (trigger != null){  
        setLoading(false)
        setShowRating(true)
      }
    }, [rating, sameResponse]);

    // this only needs to run if the rating score changes 
    useEffect(() => {    
      if (trigger != null){
        if(userRatingResponse){
          console.log("The score is: " + userRatingResponse)
          setRating(setRatingStars(userRatingResponse))}
        else{
          console.log("rating couldnt be generated :(")
          setRating("Error generating rating :( enter more info or try again later");
        }
      }
    }, [userRatingResponse]);


    function setRatingStars(score) {
      let fullStars = Math.floor(score);  // Get the full stars
      let halfStar = (score % 1 >= 0.5) ? 1 : 0;  // Add a half star if score >= 0.5
      let emptyStars = 5 - fullStars - halfStar;
  
      let stars = [];       // Create an array of image elements for each star
  
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
      setShowRating(false)
      setLoading(true)
      console.log("inside rating function")
      const budget = localStorage.getItem('userBudgetMaxStored');
      const numBeds = localStorage.getItem('userNumBedsStored');

      if (pricePW > budget && numBeds > propertyNumBeds){
        setThumbsUp(false);
      }
      else{
        setThumbsUp(true)
      }

      try {
        // TODO pass in whethe the property meets requirement sand change API to call to max 2/5 stars if no meets requirements 
        const userYesNoAnswers = localStorage.getItem('userYesNoAnswers');
        const userScaleAnswers = localStorage.getItem('scaleAnswers');
        const data = await getUserRating(propertyDescription, `I like gardens, my budget is $${String(budget)} per week. Here are my answers to a survey, they should tell you more about my preferences: ${String(userYesNoAnswers)}. And these are more answrs to a survey, indicating how much I care about certain features: ${String(userScaleAnswers)}. I require ${String(numBeds)} bedrooms.I love cooking`);
        if (data == userRatingResponse){
          setSameResponse(!sameResponse)
        }
        else{
          setUserRatingResponse(data); // Set the response message from the API
        }
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
      <br></br>
      {/*<LocationInfo/> {/* this is just for testing purposes .. will remove later */}
      {loading == true && <div> loading ... </div> }
      {showRating == true && <div>
      {/*<h2>{thumbsUp ? '👍' : '👎'}</h2>*/}
      <h2>{rating}</h2></div>
      }
    </div>
  );
};

// Export the component
export default RatingGenerator;