import React, { useEffect, useState } from 'react';
import GetUsersName from "../components/UserInput.js";
import Quiz from './Quiz.js';

// note that this file is tab 1 

const Homepage = () => {
  // this constant simply adds a variable in this page --> the value we want is retrieved from local storage as it is called 'userName'
  // logic and functions to create and save variables can be found in ../components/UserInput 
    const [userNameValue, setInputValue] = useState('');

    useEffect(() => {
        const savedValue = localStorage.getItem('userName');
        if (savedValue) {
          setInputValue(savedValue);
        }
      }, []);

  return (
    <div>
      <header>
        <h1>Welcome to the Rental Finder Tool {userNameValue}👋</h1>
        <h2>We hope we can help you find an awesome rental</h2>
        <GetUsersName />
      </header>
    </div>
  );
};

// Export the component
export default Homepage;