import React, { useState, useEffect } from 'react';

function QuizInput () {
  const [userBudgetMax, setInputValue] = useState('');

  const [userNumBeds, setNumBeds] = useState('');

  useEffect(() => {
    const savedMaxBudget = localStorage.getItem('userBudgetMaxStored');
    if (savedMaxBudget) {
      setInputValue(savedMaxBudget);
    }

    const savedUserNumBeds = localStorage.getItem('userNumBedsStored');
    if (savedUserNumBeds) {
      setNumBeds(savedUserNumBeds);
    }
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleChangeBeds = (e) => {
    setNumBeds(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('userBudgetMaxStored', userBudgetMax);
    localStorage.setItem('userNumBedsStored', userNumBeds);
  };

  return (
    <div>
      <span className = "quizField">Budget: </span>
      <input 
        type="number" 
        value={userBudgetMax} 
        onChange={handleChange} 
      />
      <p className = "quizField">Do you like to walk?</p>
      <span className = "quizField">Prefered number of bedrooms: </span>
      <input 
        type="number" 
        value={userNumBeds} 
        onChange={handleChangeBeds} 
      />
      <br></br>
      <button className="buttonStyle" onClick={handleSave}>Save</button>
    </div>
  );
};
export default QuizInput;