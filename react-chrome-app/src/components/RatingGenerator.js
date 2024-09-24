import React, { useEffect, useState } from 'react';

const RatingGenerator = ({trigger}) => {
    const [rating, setRating] = useState('☆☆☆☆☆');
    
    const [thumbsUp, setThumbsUp] = useState();

    const [propertyInput, setPropertyInput] = useState('');

    const [pricePW, setPricePW] = useState(0);

    const [location, setLocation] = useState('');

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
      // retrieve local storage values
      //const executeAfterDelay = async () => {
        //await delay(3);  // waits 3 seconds for values in PI to be stored.. ideally would trigger automatically once these values are stored but this should be fine for now as it is only a temporary solution
        //console.log("went through")
        const savedPricePW = localStorage.getItem('pricePWStored');
        const savedLocation = localStorage.getItem('propertyLocationStored');
        const savedPI = localStorage.getItem('propertyInputStored');
        if (savedPricePW) {
          setPricePW(savedPricePW);
        }

        if (savedLocation){
          setLocation(savedLocation);
        }

        if (savedPI){
          setPropertyInput(savedPI);
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
      const budget = localStorage.getItem('userBudgetMaxStored')
      console.log("inside generate rating function")

      /* Requirements .. if all good return 3 stars OR just do thumbs up 
         Firm requirements include:
          - Max Budget
          - Min number bedrooms 
          - If they definitely have a pet 
      */ 
      if (pricePW > budget){
        setThumbsUp(false);
        setRating('☆☆☆☆☆')
      }
      else{
        setRating('★★★★★')
        setThumbsUp(true)
      }

      /* Use a location API to implement rating based on the rest of the preferences being treated equally */
      
    }
  
  
  return (
    <div>
      <h2>{thumbsUp ? '👍' : '👎'}</h2>
      <h2>{rating}</h2>
      {/*rating != '☆☆☆☆☆' && <button>Save Rating</button>*/}
    </div>
  );
};

// Export the component
export default RatingGenerator;