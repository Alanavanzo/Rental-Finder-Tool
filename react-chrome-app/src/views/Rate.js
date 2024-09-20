import React, { useEffect, useState } from 'react';
import PropertyInformation from '../components/PropertyInformation';
import RatingGenerator from '../components/RatingGenerator';

const Rate = () => {

  /*
    Add the below as input into PropertyInformation 
  */

  const [propertyInput, setPropertyInput] = useState('');

  const [pricePW, setPricePW] = useState(0);

  const handleDescChange = (e) => {
    setPricePW(e.target.value);
  };

  const changePricePW = (e) => {
      setPricePW(e.target.value);
    };
  
  return (
    <div>
      <header>
        <h3>Here, you can enter property info and based off of your preferences a rating will be generated!</h3>
        <br></br>
      </header>
      <div><PropertyInformation/></div>
      <button className="buttonStyle">Generate Rating</button>
      <div><RatingGenerator pricePW ={0} location={"Clayton"}/></div>
    </div>
  );
};

// Export the component
export default Rate;