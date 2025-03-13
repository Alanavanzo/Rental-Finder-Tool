import React, { useState, useEffect } from 'react';
import "../styling/Styles.css"

// TODO --> put styles in common CSS file 
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
  // proximity to work 

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
  const [userGarden, setGarden] = useState(3);  // outdoor aread attatched to the property 
  const [userKitchen, setKitchen] = useState(3);  // kitchen and cooking spaces in property
  const [showYesNo, setShowYesNo] = useState(true) // TODO - remove eventually or set to true to show yes/no questions

  const [yesNoQandAs, setYesNoQandAs] = useState()
  // note - eventually all other than rating will be scale questions because we will do a quiz
  // which allocates importance out of 10 for each factor 
  const [walkQ, setWalkQ] = useState('Do you like to walk?');
  const [cookQ, setCookQ] = useState('Do you like to cook?');   // this could potentially be a scale question
  const [petsQ, setPetsQ] = useState('Do you have pets?');
  const [parkQ, setParkQ] = useState('Do you have a car?');   // later ask how many parks 
  const [ratingQandAs, setRatingQandAs] = useState()


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

    const savedGarden = localStorage.getItem('userGardenStored');
    if (savedGarden) {
      setGarden(savedGarden);
    }

    const savedKitchen = localStorage.getItem('userKitchenStored');
    if (savedKitchen) {
      setKitchen(savedKitchen);
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

  const handleGarden = (e) => {
    setGarden(e.target.value);
  };

  const handleKitchen = (e) => {
    setKitchen(e.target.value);
  }


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
    localStorage.setItem('userGardenStored', userGarden);
    localStorage.setItem('userKitchenStored', userKitchen);

      // Create an object to store the answers
      // TODO add all questions and answers
    console.log(walkQ)
    const answers = {
      walkingQuestion: {
        question: walkQ, // The question itself
        answer: userWalking // The answer to the question
      },
      cookingQuestion: {
        question: cookQ,
        answer: userCook
      },
      petsQuestion: {
        question: petsQ,
        answer: userPets
      },
      parkQuestion: {
        question: parkQ,
        answer: userParking
      }
    };
      
    // Store the answers object in localStorage
    localStorage.setItem('userYesNoAnswers', JSON.stringify(answers));
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
            {showYesNo && ( 
              <div> 
              <h3>Yes / No Questions</h3>
                <span className = "quizField">{walkQ} </span>
                <button onClick={handleYesWalk} style={{ backgroundColor: userWalking == 'true' ? 'blue' : 'gray' , marginRight: '10px'}}>Yes
                </button>
                <button className = "quizBoxInput" onClick={handleNoWalk} style={{ backgroundColor: userWalking == 'true' ? 'gray' : 'blue' }} >No
                </button>
                <br></br>
                <span className = "quizField">{petsQ} </span>
                <button onClick={handleYesPets} style={{ backgroundColor: userPets == 'true' ? 'blue' : 'gray' , marginRight: '10px'}}>Yes
                </button>
                <button className = "quizBoxInput" onClick={handleNoPets} style={{ backgroundColor: userPets == 'true' ? 'gray' : 'blue' }} >No
                </button>
                <br></br>
                <span className = "quizField">{cookQ} </span>
                <button onClick={handleYesCook} style={{ backgroundColor: userCook == 'true' ? 'blue' : 'gray' , marginRight: '10px'}}>Yes
                </button>
                <button className = "quizBoxInput" onClick={handleNoCook} style={{ backgroundColor: userCook == 'true' ? 'gray' : 'blue' }} >No
                </button>
                <br></br>
                <span className = "quizField">{parkQ} </span>
                <button onClick={handleYesPark} style={{ backgroundColor: userParking== 'true' ? 'blue' : 'gray' , marginRight: '10px'}}>Yes
                </button>
                <button className = "quizBoxInput" onClick={handleNoPark} style={{ backgroundColor: userParking == 'true' ? 'gray' : 'blue' }} >No
                </button>
                <br></br>
                <br></br>
              </div>
            )}
            <h3>Rating Questions</h3>
              <p className="quizField">For the below components, rate them on a scale of 1 to 5 - 1 indicating how important they are to you, with 1 indicating that you do not care</p>
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
            <span className = "quizField">Garden: </span>
              <input
                type="number" 
                className="quizNumInput" 
                min={1}
                max={5}
                style={{ width: '50px', padding: '1px' }}
                value={userGarden} 
                onChange={handleGarden} 
              />
            <br></br>
            <span className = "quizField">Kitchen: </span>
              <input
                type="number" 
                className="quizNumInput" 
                min={1}
                max={5}
                style={{ width: '50px', padding: '1px' }}
                value={userKitchen} 
                onChange={handleKitchen} 
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