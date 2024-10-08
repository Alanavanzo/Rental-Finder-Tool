import React, { useState, useEffect } from 'react';
import "../styling/Styles.css"

function Requirements () {

    // TO-DO .. eventually, it would be great if requirements are dynamic so that users can control what are hard deal breakers for themselves 
    // requirements will be treated as such --> requirements could be stored in the same way that the favourites list is currently stores
    // but there would just be a set list of possible requirements 

  const [requirementsOnOff, setRequirements] = useState('false');

  const [userBudgetMax, setInputValue] = useState('');

  const [userBudgetMin, setBudgetMin] = useState('');

  const [userNumBeds, setNumBeds] = useState('');


  useEffect(() => {
    const savedMinBudget = localStorage.getItem('userBudgetMinStored');
    if (savedMinBudget) {
      setBudgetMin(savedMinBudget);
    }

    const savedMaxBudget = localStorage.getItem('userBudgetMaxStored');
    if (savedMaxBudget) {
      setInputValue(savedMaxBudget);
    }

    const savedUserNumBeds = localStorage.getItem('userNumBedsStored');
    if (savedUserNumBeds) {
      setNumBeds(savedUserNumBeds);
    }

  }, []);

  const goToRequirements = () => {
    setRequirements('true');
  };

  const handleChangeMinBudget = (e) => {
    setBudgetMin(e.target.value);
  };

  const handleChangeMaxBudget = (e) => {
    setInputValue(e.target.value);
  };

  const handleChangeBeds = (e) => {
    setNumBeds(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('userBudgetMinStored', userBudgetMin);
    localStorage.setItem('userBudgetMaxStored', userBudgetMax);
    localStorage.setItem('userNumBedsStored', userNumBeds);
    setRequirements('false');
  };

  return (
    <div>
    {(() => {
      if (requirementsOnOff == 'false') {
        return <button className="goToButton" onClick={goToRequirements} >View Requirements</button>;
      } else {
        return <div>
            {/* TODO for budget, check that Min is less than max */}
      <h2>Requirements </h2>
      <span className = "quizField">Budget: </span>
      <input 
        type="number" 
        className="quizNumInput"
        style={{ width: '50px', padding: '1px' , marginRight: '10px'}}
        placeholder={"min"}
        value={userBudgetMin} 
        onChange={handleChangeMinBudget} 
      />
      <input 
        type="number" 
        className="quizInlineInput"
        style={{ width: '50px', padding: '1px' }}
        placeholder={"max"}
        value={userBudgetMax} 
        onChange={handleChangeMaxBudget} 
      />
      <br></br>
      <span className = "quizField">Min # bedrooms: </span>
      <input
        type="number" 
        className="quizNumInput" 
        style={{ width: '50px', padding: '1px' }}
        value={userNumBeds} 
        onChange={handleChangeBeds} 
      />
      <button className = "saveButton" onClick={handleSave}>Update Requirements</button>
        </div>;
      }
    })()}
  </div>
  );
};
export default Requirements;