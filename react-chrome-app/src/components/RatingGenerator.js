import React, { useEffect, useState } from 'react';
import LocationInfo from './LocationInfo';

const RatingGenerator = ({trigger}) => {
    const [rating, setRating] = useState('☆☆☆☆☆');
    
    const [thumbsUp, setThumbsUp] = useState();

    const [propertyInput, setPropertyInput] = useState('');

    const [pricePW, setPricePW] = useState(0);

    const [location, setLocation] = useState('');

    const [propertyNumBeds, setPropertyNumBeds] = useState(0);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
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

        console.log(pricePW);
        console.log(propertyInput);
        console.log(location);
      //};
      
      //executeAfterDelay;
        generateRating();

      // generate a rating 
    }, [trigger]);

    /*
    Generate ratings 
    */

    function generateRating(){
      const budget = localStorage.getItem('userBudgetMaxStored');
      const numBeds = localStorage.getItem('userNumBedsStored');
      console.log("inside generate rating function");
      const rating_points = 0; 

      /* Requirements .. if all good return 3 stars OR just do thumbs up 
         Firm requirements include:
          - Max Budget
          - Min number bedrooms 
          - If they definitely have a pet 
      */ 
      if (pricePW > budget){
        setThumbsUp(false);
        setRating('☆☆☆☆☆');
        //rating_points = 0;
      }
      else if (numBeds > propertyNumBeds){ 
        setThumbsUp(false);
        setRating('☆☆☆☆☆'); 
      }
      // TODO add pets 
      else{
        setRating('★★★★★')
        setThumbsUp(true)
      }

      // If it's a thumbs up, they have rating points to lose based on preferences, at a minimum of 2.5 points 
      // if thumbs down, they have rating points to gain at a maximum of 2.5 points 
      // may be better to do percentage rather than stars 

      /* Use a location API to implement rating based on the rest of the preferences being treated equally */
      
    }
  
  
  return (
    <div>
      <h2>{thumbsUp ? '👍' : '👎'}</h2>
      <h2>{rating}</h2>
      <LocationInfo/> {/* this is just for testing purposes .. will remove later */}
      {/*rating != '☆☆☆☆☆' && <button>Save Rating</button>*/}
    </div>
  );
};

// Export the component
export default RatingGenerator;