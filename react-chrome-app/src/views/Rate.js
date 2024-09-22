import React, { useEffect, useState } from 'react';
import PropertyInformation from '../components/PropertyInformation';
import RatingGenerator from '../components/RatingGenerator';

const Rate = () => {

  const [trigger, setTrigger] = useState(false);
  
  // currently PI and RG and storing and retrieiving values simultaneously so you need to click twice .. need to fix .. not a big deal rn 
  const pullRatingTrigger = () => {
    setTrigger(!trigger);
  };
  
  return (
    <div>
      <header>
        <h3>Here, you can enter property info and based off of your preferences a rating will be generated!</h3>
        <br></br>
      </header>
      <div><PropertyInformation trigger ={trigger}/></div>
      <button className="buttonStyle" onClick={pullRatingTrigger}>Generate Rating</button>
      <div><RatingGenerator trigger ={trigger}/></div>
    </div>
  );
};

// Export the component
export default Rate;