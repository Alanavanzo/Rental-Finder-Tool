import React, { useEffect, useState } from 'react';

const PropertyInformation = () => {
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

        <span className = "quizField"> Price per Week:  </span>
        <input
            type="number" 
            className="quizNumInput" 
            min={0}
            max={10000}
            style={{ width: '50px', padding: '1px' }}
            value={pricePW} 
            onChange={changePricePW} 
        />
        <br></br>
        <span className = "quizField"> Property Description:  </span>
      <textarea
        type="text" 
        placeholder={"enter property info"}
        value={propertyInput} 
        onChange={handleDescChange} 
      />
      <br></br>
    </div>
  );
};

// Export the component
export default PropertyInformation;