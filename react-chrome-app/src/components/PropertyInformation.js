import React, { useEffect, useState } from 'react';

const PropertyInformation = ({trigger, desc, beds, price, bath}) => {
    // these values reset to their initial state every time the user exits out of the window .. instead set like the 
    // quiz input and add a reset button to clear local storage and revert values back to original as below 
    // Initialize state with props if available, otherwise fallback to default values
    const [propertyInput, setPropertyInput] = useState(desc || '');
    const [location, setLocation] = useState('');
    const [pricePW, setPricePW] = useState(price || 0);
    const [numBedsPI, setNumBedsPI] = useState(beds || 1);
    const [petFriendly, setPetFriendly] = useState('');

    // additional values
    const [numBath, setNumBath] = useState(bath || 1);

    // Effect to store the values in localStorage whenever they change
    useEffect(() => {
      localStorage.setItem('pricePWStored', pricePW);
      localStorage.setItem('numBedsPIStored', numBedsPI);
      localStorage.setItem('propertyLocationStored', location);
      localStorage.setItem('propertyInputStored', propertyInput);
      localStorage.setItem('petFriendlyStored', petFriendly);
      localStorage.setItem('numBathStored', numBath);
      console.log("property info has been updated in local storage");
    }, [pricePW, numBedsPI, location, propertyInput, petFriendly]);

    useEffect(() => {
      // store all values in local storage --> currently called everytime page reloads so will reset
        localStorage.setItem('pricePWStored', pricePW);
        localStorage.setItem('numBedsPIStored',numBedsPI);
        localStorage.setItem('pricePWStored', pricePW);
        localStorage.setItem('propertyLocationStored', location);
        localStorage.setItem('propertyInputStored', propertyInput);
        localStorage.setItem('petFriendlyStored', petFriendly);
        localStorage.setItem('numBathStored', numBath);
        console.log("property info has been updated in local storage");
    }, [trigger]);

    // handle changes to inputs 
  
    const handleDescChange = (e) => {
      setPropertyInput(e.target.value);
    };

    const changePricePW = (e) => {
        setPricePW(e.target.value);
      };


    const changeNumBedsPI = (e) => {
      setNumBedsPI(e.target.value);
    };

    const changeLocation = (e) => {
      setLocation(e.target.value);
    };

    const handlePetFriendly = (e) => {
      setPetFriendly(e.target.value);
    }

    const changeNumBath = (e) => {
      setNumBath(e.target.value);
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
        <span className = "quizField"> Number of Bedrooms:  </span>
        <input
            type="number" 
            className="quizNumInput" 
            min={0}
            max={20}
            style={{ width: '50px', padding: '1px' }}
            value={numBedsPI} 
            onChange={changeNumBedsPI} 
        />
        <br></br>
        <span className = "quizField"> Number of Bathrooms:  </span>
        <input
            type="number" 
            className="quizNumInput" 
            min={0}
            max={20}
            style={{ width: '50px', padding: '1px' }}
            value={numBath} 
            onChange={changeNumBath} 
        />
        <br></br>
        <span className = "quizField"> Location:  </span>
        <input
            type="text" 
            style={{ width: '80px', padding: '1px' }}
            placeholder='Suburb'
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