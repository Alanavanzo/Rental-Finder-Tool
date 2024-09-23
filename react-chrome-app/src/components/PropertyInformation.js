import React, { useEffect, useState } from 'react';

const PropertyInformation = ({trigger}) => {
    const [propertyInput, setPropertyInput] = useState('');

    const [location, setLocation] = useState('');

    const [pricePW, setPricePW] = useState(0);

    const [petFriendly, setPetFriendly] = useState('');

    useEffect(() => {
      // store all values in local storage 
      // currently called everytime page reloads so will reset .. can change if needed to only occur if there are values for the variables 
        localStorage.setItem('pricePWStored', pricePW);
        localStorage.setItem('propertyLocationStored', location);
        localStorage.setItem('propertyInputStored', propertyInput);
        localStorage.setItem('petFriendlyStored', petFriendly);
    }, [trigger]);
  
    const handleDescChange = (e) => {
      setPropertyInput(e.target.value);
    };

    const changePricePW = (e) => {
        setPricePW(e.target.value);
      };

    const changeLocation = (e) => {
      setLocation(e.target.value);
    };

    const handlePetFriendly = (e) => {
      setPetFriendly(e.target.value);
    }

  
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
        <span className = "quizField"> Location:  </span>
        <input
            type="text" 
            style={{ width: '50px', padding: '1px' }}
            value={location} 
            onChange={changeLocation} 
        />
        <br></br>
        <span className = "quizField"> Pet Friendly:  </span>
        <input
            type="text" 
            style={{ width: '50px', padding: '1px' }}
            value={petFriendly} 
            onChange={handlePetFriendly} 
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