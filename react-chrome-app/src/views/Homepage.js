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
    
      const handleSave = () => {
        localStorage.setItem('userInput', inputValue);
      };
    

  //return <h1>Hello from JavaScript Functional Component!</h1>;
  return (
    <div>
      <header>
        <h2>Welcome to the Rental Finder Tool {inputValue}👋</h2>
        <h3>We hope we can help you find an awesome rental</h3>
      </header>
    </div>
  );
};

// Export the component
export default WelcomeUser;