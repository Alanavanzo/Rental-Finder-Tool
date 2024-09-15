import React, { useEffect, useState } from 'react';

const Rate = () => {
    const [propertyInput, setPropertyInput] = useState('');
  
    const handleChange = (e) => {
      setPropertyInput(e.target.value);
    };
  
  return (
    <div>
      <header>
        <h3>Here, you can enter property info and based off of your preferences a rating will be generated!</h3>
        <br></br>
      </header>
      <textarea
        type="text" 
        placeholder={"enter property info"}
        value={propertyInput} 
        onChange={handleChange} 
      />
      <br></br>
      <button className="buttonStyle">Generate Rating</button>
    </div>
  );
};

// Export the component
export default Rate;