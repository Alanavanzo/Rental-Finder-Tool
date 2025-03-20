import React, { useEffect, useState } from 'react';

const PropertyInformation = ({trigger, desc, beds, price, bath, propertyAddress}) => {
    // these values reset to their initial state every time the user exits out of the window .. instead set like the 
    // quiz input and add a reset button to clear local storage and revert values back to original as below 
    // Initialize state with props if available, otherwise fallback to default values
    const [propertyInput, setPropertyInput] = useState(desc || '');
    const [address, setAddress] = useState(propertyAddress || '');
    const [location, setLocation] = useState('');
    const [pricePW, setPricePW] = useState(price || 0);
    const [numBedsPI, setNumBedsPI] = useState(beds || 1);
    const [petFriendly, setPetFriendly] = useState('');

    // additional values
    const [numBath, setNumBath] = useState(bath || 1);

    // Effect to store the values in localStorage whenever they change
    useEffect(() => {
      localStorage.setItem('pricePWStored', pricePW);
      localStorage.setItem('addressStored', address);
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
        localStorage.setItem('addressStored', address);
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

    const handleAddressChange = (e) => {
      setAddress(e.target.value);
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
      <div className="propertyFieldWrapper">
        <span className = "propertyField"> Address:  </span>
          <textarea
            type="text" 
            class="propertyInputFieldLong"
            placeholder={"enter property address"}
            value={address} 
            onChange={handleAddressChange} 
          />
      </div>
        <div className="propertyFieldWrapper">
        <span className = "propertyField"> Price per Week:  </span>
        <input
            type="number" 
            className="propertyNumInput" 
            min={0}
            max={10000}
            value={pricePW} 
            onChange={changePricePW} 
        />
        </div>
        <div className="propertyFieldWrapper">
        <span className = "propertyField"> Number of Bedrooms:  </span>
        <input
            type="number" 
            className="propertyNumInput" 
            min={0}
            max={20}
            value={numBedsPI} 
            onChange={changeNumBedsPI} 
        />
        </div>
        <div className="propertyFieldWrapper">
          <span className = "propertyField"> Number of Bathrooms:  </span>
          <input
            type="number" 
            className="propertyNumInput" 
            min={0}
            max={20}
            value={numBath} 
            onChange={changeNumBath} 
            />
        </div>
        <div className="propertyFieldWrapper">
          <span className = "propertyField"> Location:  </span>
          <input
              type="text" 
              className="propertyInputField"
              placeholder='suburb ...'
              value={location} 
              onChange={changeLocation} 
          />
        </div>
        <div className="propertyFieldWrapper">
          <span className = "propertyField"> Pet Friendly:  </span>
          <input
              type="text" 
              className="propertyInputField"
              value={petFriendly} 
              onChange={handlePetFriendly} 
          />
        </div>
        <div className="propertyFieldWrapper propertyFieldWrapperDescription">
        <span className="propertyField">Property Description: </span>
        <textarea
          className="propertyDescriptionInputField"
          placeholder="Enter property info ..."
          value={propertyInput}
          onChange={handleDescChange}
        />
      </div>
    </div>
  );
};

// Export the component
export default PropertyInformation;