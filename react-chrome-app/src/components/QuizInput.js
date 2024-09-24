import React, { useState, useEffect } from 'react';
import "../styling/Styles.css"

// TODO --> change yes/no to true and false 
function QuizInput () {  

  // kids 
  // prefer apartment or house 
  // gardening / time outdoors --> will impact outdoor areas 
  // cooking --> will impact kitchen size 
  // restaurants and cafes
  // activities 
  // exercise --> can look into parks, gyms, pools, etc. 
  // pets should probably be a requirement 

  const [quizOnOff, setQuiz] = useState('false');

  const [userWalking, setWalking] = useState(''); // location 

  const [userPets, setPets] = useState(''); // property rules

  const [userCook, setCook] = useState('');   // property features     

  const [userParking, setParking] = useState('');  // location and property features  

  const [userActivities, setActivities] = useState(3);  // impacts location 

  const [userSchools, setSchools] = useState(3);  // impacts location 

  const [userRestaurants, setRestaurants] = useState(3);  // impacts location 

  const [userPT, setPT] = useState(3);  // impacts location 

  const [userModern, setModern] = useState(3);  // building age and renovated features 

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

    const savedParking = localStorage.getItem('userParkingStored');
    if (savedParking) {
      setParking(savedParking);
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

    const savedPT = localStorage.getItem('userPTStored');
    if (savedPT) {
      setPT(savedPT);
    }

    const savedModern = localStorage.getItem('userModernStored');
    if (savedModern) {
      setModern(savedModern);
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

  const handleYesPark = () => {
    setParking('true');
  };

  const handleNoPark = () => {
    setParking('false');
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

  const handlePT = (e) => {
    setPT(e.target.value);
  };

  const handleModern = (e) => {
    setModern(e.target.value);
  };


  const handleSave = () => {
    localStorage.setItem('userWalkingStored', userWalking); 
    localStorage.setItem('userPetsStored', userPets);
    localStorage.setItem('userCookStored', userCook);
    localStorage.setItem('userParkingStored', userParking);
    localStorage.setItem('userActivitiesStored', userActivities);
    localStorage.setItem('userSchoolsStored', userSchools);
    localStorage.setItem('userRestaurantsStored', userRestaurants);
    localStorage.setItem('userPTStored', userPT);
    localStorage.setItem('userModernStored', userModern);
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
              <span className = "quizField">Do you have a car?  </span>
              <button onClick={handleYesPark} style={{ backgroundColor: userParking== 'true' ? 'blue' : 'gray' , marginRight: '10px'}}>Yes
              </button>
              <button className = "quizBoxInput" onClick={handleNoPark} style={{ backgroundColor: userParking == 'true' ? 'gray' : 'blue' }} >No
              </button>
              <br></br>
              <br></br>
            <h3>Rating Questions</h3>
              <p className="quizField">For the below components, rate them on a scale of 1 to 5 - 1 indicating that you don't want that feature,3 being neutral and 5 being that you do want it</p>
              <span className = "quizField">Activities Nearby:  </span>
              <input
                type="number" 
                className="quizNumInput" 
                min={1}
                max={5}
                style={{ width: '50px', padding: '1px' }}
                value={userActivities} 
                onChange={handleActivities} 
              />
              <br></br>
              <span className = "quizField">School Zones: </span>
              <input
                type="number" 
                className="quizNumInput" 
                min={1}
                max={5}
                style={{ width: '50px', padding: '1px' }}
                value={userSchools} 
                onChange={handleSchools} 
              />
              <br></br>
              <span className = "quizField">Restaurants: </span>
              <input
                type="number" 
                className="quizNumInput" 
                min={1}
                max={5}
                style={{ width: '50px', padding: '1px' }}
                value={userRestaurants} 
                onChange={handleRestaurants} 
              />
            <br></br>
            <span className = "quizField">Public Transport: </span>
              <input
                type="number" 
                className="quizNumInput" 
                min={1}
                max={5}
                style={{ width: '50px', padding: '1px' }}
                value={userPT} 
                onChange={handlePT} 
              />
            <br></br>
            <span className = "quizField">Modern: </span>
              <input
                type="number" 
                className="quizNumInput" 
                min={1}
                max={5}
                style={{ width: '50px', padding: '1px' }}
                value={userModern} 
                onChange={handleModern} 
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