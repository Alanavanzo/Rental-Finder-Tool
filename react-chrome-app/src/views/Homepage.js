import React, { useEffect, useState } from 'react';


// Define the functional component
const WelcomeUser = () => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const savedValue = localStorage.getItem('userInput');
        if (savedValue) {
          setInputValue(savedValue);
        }
      }, []);
    
      const handleChange = (e) => {
        setInputValue(e.target.value);
      };
    
      /* not needed here 
      const handleSave = () => {
        localStorage.setItem('userInput', inputValue);
      };
      */
    

  // currently only returns new saved name if page is refreshed .. probably need to change UserInputTest to refresh the page or reload values when save is clicked 
  return (
    <div>
      <header>
         {/*<h2>Welcome to the Rental Finder Tool</h2>*/}
        <h2>Welcome to the Rental Finder Tool {inputValue}👋</h2>
        <h3>We hope we can help you find an awesome rental</h3>
      </header>
    </div>
  );
};

// Export the component
export default WelcomeUser;