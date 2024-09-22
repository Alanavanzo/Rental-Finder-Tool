import React, { useEffect, useState } from 'react';

const RatingGenerator = ({trigger}) => {
    const [rating, setRating] = useState('☆☆☆☆☆');

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


      // generate a rating 
    }, [trigger]);

    /*
    Generate ratings 
    */
  
  
  return (
    <div>
      <h3>{rating}</h3>
      {rating != '☆☆☆☆☆' && <button>Save Rating</button>}
    </div>
  );
};

// Export the component
export default RatingGenerator;