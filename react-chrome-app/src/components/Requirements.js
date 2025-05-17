import React, { useState, useEffect } from 'react';
import "../styling/Styles.css"

function Requirements () {

    // TO-DO .. eventually, it would be great if requirements are dynamic so that users can control what are hard deal breakers for themselves 
    // requirements will be treated as such --> requirements could be stored in the same way that the favourites list is currently stores
    // but there would just be a set list of possible requirements 

  const [requirementsOnOff, setRequirements] = useState('false');

  const [userBudgetMax, setInputValue] = useState('');

  const [userPropertyType, setPropertyType] = useState('');

  const [userNumBeds, setNumBeds] = useState('');
  const [location, setLocation] = useState('');

  const [extraRequirements, setExtraRequirements] = useState([]);

  const [showExtraRequirements, setShowExtraRequirements] = useState(false)

  const availableExtras = [
    "Pet Friendly",
    "Smoke Friendly",
    "Communal Pool",
    "Backyard",
    "Furnished",
    "Close to Public Transport",
    "Air Conditioning",
    "Schools nearby",
  ];

  useEffect(() => {

    const savedMaxBudget = localStorage.getItem('userBudgetMaxStored');
    if (savedMaxBudget) {
      setInputValue(savedMaxBudget);
    }

    const savedUserNumBeds = localStorage.getItem('userNumBedsStored');
    if (savedUserNumBeds) {
      setNumBeds(savedUserNumBeds);
    }

    const savedLocation = localStorage.getItem('userLocationStored');
    if (savedLocation) {
      setLocation(savedLocation);
    }

    const savedPropertyType = localStorage.getItem('userPropertyTypeStored');
    if (savedPropertyType) {
      setPropertyType(savedPropertyType);
    }

    const savedExtras = localStorage.getItem('extraRequirementsStored');
    if (savedExtras) {
      setExtraRequirements(JSON.parse(savedExtras)); // since it's stored as JSON string
    }

  }, []);

  const goToRequirements = () => {
    setRequirements('true');
  };

  const handleChangeMaxBudget = (e) => {
    setInputValue(e.target.value);
  };

  const handleChangePropertyType = (e) => {
    setPropertyType(e.target.value);
  };

  const handleChangeBeds = (e) => {
    setNumBeds(e.target.value);
  };

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleExtraRequirementToggle = (requirement) => {
    setExtraRequirements(prev => {
      if (prev.includes(requirement)) {
        return prev.filter(item => item !== requirement);
      } else {
        return [...prev, requirement];
      }
    });
  };

  const handleSave = () => {
    localStorage.setItem('userBudgetMaxStored', userBudgetMax);
    localStorage.setItem('userNumBedsStored', userNumBeds);
    localStorage.setItem('userLocationStored', location);
    localStorage.setItem('userPropertyTypeStored', userPropertyType);
    localStorage.setItem('extraRequirementsStored', JSON.stringify(extraRequirements)); // save as JSON
    const userRequirements = {
      budgetMax: userBudgetMax,
      propertyType: userPropertyType,
      numBeds: userNumBeds,
      location: location,
      extras: extraRequirements
    };
  
    // Save the entire object as a JSON string
    localStorage.setItem('userRequirements', JSON.stringify(userRequirements));
    setRequirements('false');
  };

  return (
    <div>
    {(() => {
      if (requirementsOnOff == 'false') {
        return <button className="vibrantButton" onClick={goToRequirements} >View Requirements</button>;
      } else {
        return <div>
      <span className = "topicHeader">Requirements </span>
      <div className="requirementFieldWrapper">
        <span className = "quizField">Budget: </span>
        <input 
          type="number" 
          className="quizInputField"
          placeholder={"max"}
          value={userBudgetMax} 
          onChange={handleChangeMaxBudget} 
        />
      </div>
      <div className="requirementFieldWrapper">
        <span className = "quizField">Property Type: </span>
        <select 
          className="propertyInputFieldLong"
          value={userPropertyType}
          onChange={handleChangePropertyType}
          >
          <option value="">Don't mind</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="townhouse">Townhouse</option>
          <option value="studio">Studio</option>
          <option value="villa">Villa</option>
          <option value="duplex">Duplex</option>
        </select>
      </div>
      <div className="requirementFieldWrapper">
      <span className = "quizField">Location: </span>
      <input 
        type="string" 
        className="quizInputField"
        value={location} 
        onChange={handleChangeLocation} 
      />
      </div>
      <div className="requirementFieldWrapper">
      <span className = "quizField">Min # bedrooms: </span>
      <input
        type="number" 
        className="quizInputField"
        value={userNumBeds} 
        onChange={handleChangeBeds} 
      />
      </div>
      <div className="requirementFieldWrapper">
      <span className = "quizField">Extra Requirements: </span>
      <div className="extra-requirements-dropdown">
            {availableExtras.map((item, index) => (
              <label key={index} style={{ display: 'block', margin: '4px 0' }}>
                <input
                  type="checkbox"
                  checked={extraRequirements.includes(item)}
                  onChange={() => handleExtraRequirementToggle(item)}
                />
                {` ${item}`}
              </label>
            ))}
      </div>
      </div>
      <button className = "buttonStyle" onClick={handleSave}>Update Requirements</button>
        </div>;
      }
    })()}
  </div>
  );
};
export default Requirements;