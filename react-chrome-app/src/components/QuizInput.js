import React, { useState, useEffect } from 'react';
import "../styling/Styles.css"

function QuizInput () {

  // kids 
  // prefer apartment or house 
  // gardening / time outdoors --> will impact outdoor areas 
  // cooking --> will impact kitchen size 
  // restaurants and cafes
  // activities 
  // exercise --> can look into parks, gyms, pools, etc. 
  // pets should probably be a requirement 
  // TODO maybe it is a good idea to split up Requirements and quiz 

  const [quizOnOff, setQuiz] = useState('false');

  const [userWalking, setWalking] = useState(''); // location 

  const [userPets, setPets] = useState(''); // property rules

  const [userCook, setCook] = useState('');   // property features     

  const [userActivities, setActivities] = useState(1);  // impacts location 

  const [userSchools, setSchools] = useState(1);  // impacts location 

  const [userRestaurants, setRestaurants] = useState(1);  // impacts location 


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
      setCook(savedCook);
    }

    const savedActivities = localStorage.getItem('userActivitiesStored');
    if (savedActivities) {
      setActivities(savedActivities);
    }

    const savedSchools = localStorage.getItem('userSchoolsStored');
    if (savedSchools) {
      setSchools(savedSchools);
    }

    const savedRestaurants = localStorage.getItem('userRestaurantsStored');
    if (savedRestaurants) {
      setRestaurants(savedRestaurants);
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

  const handleActivities = (e) => {
    setActivities(e.target.value);
  };

  const handleSchools = (e) => {
    setSchools(e.target.value);
  };

  const handleRestaurants = (e) => {
    setRestaurants(e.target.value);
  };


  const handleSave = () => {
    localStorage.setItem('userWalkingStored', userWalking); 
    localStorage.setItem('userPetsStored', userPets);
    localStorage.setItem('userCookStored', userCook);
    localStorage.setItem('userActivitiesStored', userActivities);
    localStorage.setItem('userSchoolsStored', userSchools);
    localStorage.setItem('userRestaurantsStored', userRestaurants);
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
            <h3>Yes / No Questions</h3>
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
              <br></br>
            <h3>Rating Questions</h3>
              <p className="quizField">For the below components, rate them on a scale of 1 to 10 - 1 indicating that you don't want that feature, 5 being neutral and 10 being that you do want it</p>
              <span className = "quizField">Activities Nearby:  </span>
              <input
                type="number" 
                className="quizNumInput" 
                style={{ width: '50px', padding: '1px' }}
                value={userActivities} 
                onChange={handleActivities} 
              />
              <br></br>
              <span className = "quizField">School Zones: </span>
              <input
                type="number" 
                className="quizNumInput" 
                style={{ width: '50px', padding: '1px' }}
                value={userSchools} 
                onChange={handleSchools} 
              />
              <br></br>
              <span className = "quizField">Restaurants: </span>
              <input
                type="number" 
                className="quizNumInput" 
                style={{ width: '50px', padding: '1px' }}
                value={userRestaurants} 
                onChange={handleRestaurants} 
              />
            <br></br>
            <button className = "saveButton" onClick={handleSave}>Save Quiz</button>
          </div>;
        }
      })()}
    </div>
  );
};
export default QuizInput;