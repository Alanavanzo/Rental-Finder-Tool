import React, { useState, useEffect } from 'react';

const GetUsersName = () => {
  const [userNameInputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedValue = localStorage.getItem('userName');
    if (savedValue) {
      setInputValue(savedValue);
    }
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('userName', userNameInputValue);
    window.location.reload(false); // reloads page when user saves their name --> set false so server doesn't do full reload 
  };

  return (
    <div>
      <p>What is your name?</p>
      <input 
        type="text" 
        value={userNameInputValue} 
        onChange={handleChange} 
      />
      <button className="buttonStyle" onClick={handleSave}>Save</button>
    </div>
  );
};
export default GetUsersName;