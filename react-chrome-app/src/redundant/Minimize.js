import React, { useState, useEffect } from 'react';
// Moving to App.tsx as we want on-click to trigger the new screenMinimize value to be updated in App so we know to close 

// NOT currently in use 

function Minimize () {

  const [screenMinimize, setMinimize] = useState('');

  useEffect(() => {

    const savedMinimize = localStorage.getItem('screenMinimizeStored');
    if (savedMinimize) {
      setMinimize(savedMinimize);
    }

  }, []);

  const handleClick = async () => {
    setMinimize(!screenMinimize);
    localStorage.setItem('screenMinimizeStored', screenMinimize);
    console.log(localStorage.getItem('screenMinimizeStored'))
    // the below isn't working 
    //const script = await import('../App.tsx');
    //script.default();  // default function is App
  };

  return (
    <div>
        <p>Screen is minimized ? {screenMinimize ? 'true' : 'false'}</p>
      <button onClick={handleClick}>
      {screenMinimize ? '➡️' : '⬅️'}
      </button>
    </div>
  );
};
export default Minimize;