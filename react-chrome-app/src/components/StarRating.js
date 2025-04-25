import React, { useEffect, useState } from 'react';
import halfStar from '../styling/images/halfStar.png';
import fullStar from '../styling/images/fullStar.png';
import emptyStar from '../styling/images/emptyStar.png';

/*
This component takes a score as input and returns the rating as stars out of 5 
*/
const StarRating = ({score}) => {
    const halfStarURL = chrome.runtime.getURL(halfStar);
    const fullStarURL = chrome.runtime.getURL(fullStar);
    const emptyStarURL = chrome.runtime.getURL(emptyStar);

    const [rating, setRating] = useState();

    useEffect(() => {
      if(score){
        setRating(setRatingStars(score))
      }
    }, [score]);

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
  
    return score ? (
      <div>
        <h2>{rating}</h2>
      </div>
    ) : (
      <div>
        No rating available - try again later!
      </div>
    );
};

export default StarRating;