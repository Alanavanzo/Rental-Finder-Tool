import React, { useState, useEffect } from 'react';
import "../styling/Styles.css"

function QuizInput () {

  // kids 
  // prefer apartment or house 
  // gardening / time outdoors --> will impact outdoor areas 
  // cooking --> will impact kitchen size 
  // restaurants and cafes
  // activities 
  // pets should probably be a requirement 
  // TODO maybe it is a good idea to split up Requirements and quiz 

  const [userBudgetMax, setInputValue] = useState('');

  const [userBudgetMin, setBudgetMin] = useState('');

  const [userNumBeds, setNumBeds] = useState('');

  const [userWalking, setWalking] = useState('');

  const [userPets, setPets] = useState('');

  const [userCook, setCook] = useState('');


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

    const savedPets = localStorage.getItem('userPetsStored');
    if (savedPets) {
      setPets(savedPets);
    }

    const savedCook = localStorage.getItem('userCookStored');
    if (savedCook) {
      setPets(savedCook);
    }

  }, []);

  const handleChangeMinBudget = (e) => {
    setBudgetMin(e.target.value);
  };

  const handleChangeMaxBudget = (e) => {
    setInputValue(e.target.value);
  };

  const handleChangeBeds = (e) => {
    setNumBeds(e.target.value);
  };

  const handleYesWalk = () => {
    setWalking('true');
  };
  const handleNoWalk = () => {
    setWalking('false');
  };

  const handleYesPets = () => {
    setPets('true');
  };
  const handleNoPets = () => {
    setPets('false');
  };

  const handleYesCook = () => {
    setCook('true');
  };
  const handleNoCook = () => {
    setCook('false');
  };

  const handleSave = () => {
    localStorage.setItem('userBudgetMinStored', userBudgetMin);
    localStorage.setItem('userBudgetMaxStored', userBudgetMax);
    localStorage.setItem('userNumBedsStored', userNumBeds);
    localStorage.setItem('userWalkingStored', userWalking); 
    localStorage.setItem('userPetsStored', userPets);
    localStorage.setItem('userCookStored', userCook);
  };

  return (
    <div>
      {/* TODO Put budgets on same line and add check that Min is less than max */}
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
      <h2>Quiz </h2>
      <span className = "quizField">Do you like to walk?  </span>
      <button onClick={handleYesWalk} style={{ backgroundColor: userWalking == 'true' ? 'blue' : 'gray' , marginRight: '10px'}}>Yes
      </button>
      <button className = "quizBoxInput" onClick={handleNoWalk} style={{ backgroundColor: userWalking == 'true' ? 'gray' : 'blue' }} >No
      </button>
      <br></br>
      <span className = "quizField">Do you have pets?  </span>
      <button onClick={handleYesPets} style={{ backgroundColor: userPets == 'true' ? 'blue' : 'gray' , marginRight: '10px'}}>Yes
      </button>
      <button className = "quizBoxInput" onClick={handleNoPets} style={{ backgroundColor: userPets == 'true' ? 'gray' : 'blue' }} >No
      </button>
      <br></br>
      <span className = "quizField">Do you like to cook?  </span>
      <button onClick={handleYesCook} style={{ backgroundColor: userCook == 'true' ? 'blue' : 'gray' , marginRight: '10px'}}>Yes
      </button>
      <button className = "quizBoxInput" onClick={handleNoCook} style={{ backgroundColor: userCook == 'true' ? 'gray' : 'blue' }} >No
      </button>
      <br></br>
      <button className = "quizBoxInput" onClick={handleSave}>Update Preferences</button>
    </div>
  );
};
export default QuizInput;