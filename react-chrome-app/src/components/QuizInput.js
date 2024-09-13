import React, { useState, useEffect } from 'react';

function QuizInput () {
  // pets
  // kids 
  // prefer apartment or house 
  // gardening / time outdoors --> will impact outdoor areas 
  // cooking --> will impact kitchen size 
  // restaurants and cafes
  // activities 

  const [userBudgetMax, setInputValue] = useState('');

  const [userBudgetMin, setBudgetMin] = useState('');

  const [userWalking, setWalking] = useState('');

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

    const savedWalking = localStorage.getItem('userWalkingStored');
    if (savedWalking) {
      setWalking(savedWalking);
    }

    const savedUserNumBeds = localStorage.getItem('userNumBedsStored');
    if (savedUserNumBeds) {
      setNumBeds(savedUserNumBeds);
    }



  }, []);

  const handleChangeMinBudget = (e) => {
    setBudgetMin(e.target.value);
  };

  const handleChangeMaxBudget = (e) => {
    setInputValue(e.target.value);
  };
  const handleYesWalk = () => {
    setWalking(true);
  };
  const handleNoWalk = () => {
    setWalking(false);
  };

  const handleChangeBeds = (e) => {
    setNumBeds(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('userBudgetMinStored', userBudgetMin);
    localStorage.setItem('userBudgetMaxStored', userBudgetMax);
    localStorage.setItem('userWalkingStored', userWalking); // TODO user walking not currently showing correctly on update
    localStorage.setItem('userNumBedsStored', userNumBeds);
  };

  return (
    <div>
      {/* TODO Put budgets on same line and add check that Min is less than max */}
      <span className = "quizField">Min Budget: </span>
      <input 
        type="number" 
        placeholder={"min budget"}
        value={userBudgetMin} 
        onChange={handleChangeMinBudget} 
      />
      <span className = "quizField">Max Budget: </span>
      <input 
        type="number" 
        placeholder={"max budget"}
        value={userBudgetMax} 
        onChange={handleChangeMaxBudget} 
      />
      <span className = "quizField">Do you like to walk?  </span>
      <button onClick={handleYesWalk} style={{ backgroundColor: userWalking ? 'blue' : 'gray' , marginRight: '10px'}}>Yes
      </button>
      <button onClick={handleNoWalk} style={{ backgroundColor: userWalking ? 'gray' : 'blue' }} >No
      </button>
      <br></br>
      <span className = "quizField">Num bedrooms: </span>
      <input 
        type="number" 
        style={{ width: '50px', padding: '1px' }}
        value={userNumBeds} 
        onChange={handleChangeBeds} 
      />
      <br></br>
      <button className="buttonStyle" onClick={handleSave}>Update Preferences</button>
    </div>
  );
};
export default QuizInput;