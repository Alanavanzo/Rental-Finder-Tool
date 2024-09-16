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

  const [quizOnOff, setQuiz] = useState('false');

  const [userWalking, setWalking] = useState('');

  const [userPets, setPets] = useState('');

  const [userCook, setCook] = useState('');


  useEffect(() => {

    const savedWalking = localStorage.getItem('userWalkingStored');
    if (savedWalking) {
      setWalking(savedWalking);
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

  const goToQuiz = () => {
    setQuiz('true');
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
    localStorage.setItem('userWalkingStored', userWalking); 
    localStorage.setItem('userPetsStored', userPets);
    localStorage.setItem('userCookStored', userCook);
    setQuiz('false');
  };

  return (
    <div>
      {(() => {
        if (quizOnOff == 'false') {
          return <button className="goToButton" onClick={goToQuiz} >Start Quiz</button>;
        } else {
          return <div>
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
            <button className = "quizBoxInput" onClick={handleSave}>Save Quiz</button>
          </div>;
        }
      })()}
    </div>
  );
};
export default QuizInput;