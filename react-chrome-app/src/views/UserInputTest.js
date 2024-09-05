import React, { useState, useEffect } from 'react';

const UserInputTest1 = () => {
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

  return (
    <div>
      <p>What is your name?</p>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
      />
      <button onClick={handleSave}>Save</button>
      {/*<p>Current Input: {inputValue}</p>*/}
    </div>
  );
};
export default UserInputTest1;