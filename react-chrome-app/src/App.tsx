import React, { useState, useEffect } from 'react';
import Navbar from "./views/Navbar.js";
import Minimized_view from './views/MinimizedView.js';
import LogoComponent from './components/LogoDisplay.js'
import { ReactDOM } from "react";
import "./App.css"
import "./styling/Styles.css"
import Homepage from './views/Homepage.js';
import ScrollRatings from './views/ScrollRatings.js';

function App() {
  const [goHomeTrigger, pullHomeTrigger] = useState(true);  // default to home if nothing in local storage 

  const [screenMinimize, setMinimize] = useState(() => {
    // Check if 'minimizedStored' exists in localStorage
    const savedMinimize = localStorage.getItem('minimizedStored');
    console.log(localStorage.getItem('minimizedStored'));
    
    // If there is a value in localStorage, return its boolean equivalent, otherwise return true
    return savedMinimize ? savedMinimize === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('minimizedStored', String(screenMinimize));
  }, [screenMinimize]);

  const handleClick = async () => {
      setMinimize(!screenMinimize);
  };

  const handleHomeClick = async () => {
    pullHomeTrigger(!goHomeTrigger);   // doesn't matter what the value is, as we just need this to trigger useEffect in Navbar 
    localStorage.setItem('mostRecentView', 'home');  // set the most recent view to home
  };

  // add routing info 
  return (
    <div>
      <div className={screenMinimize ? 'minimized' : 'sidebar'}>
        <button onClick={handleClick} style={{ fontSize: '18px', float: 'right' }}>
          {screenMinimize ? '➡️' : '⬅️'}
        </button>
        {screenMinimize && <Minimized_view/>}
        {!screenMinimize && <LogoComponent/>}
        {!screenMinimize && <button style={{ fontSize: '18px', float: 'right' }}>⚙️</button>} 
        {!screenMinimize && <button onClick={handleHomeClick} style={{ fontSize: '18px' , float: 'right'}}>🏠</button>} 
        {!screenMinimize &&  <Navbar goHomeTrigger={goHomeTrigger}/>}
      </div>
      <div className='scroll'>
        <ScrollRatings/>
      </div>
    </div>
  );
}

export default App;
