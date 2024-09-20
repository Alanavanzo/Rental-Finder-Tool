import React, { useState, useEffect } from 'react';
import Navbar from "./views/Navbar.js";
import Minimized_view from './views/Minimized_view.js';
import { ReactDOM } from "react";
import "./App.css"
import "./styling/Styles.css"
import Homepage from './views/Homepage.js';

// TODO --> change to true/false .. not yet/no 
function App() {
  const [screenMinimize, setMinimize] = useState(true);
  const [goHome, setHome] = useState('');

  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    // TODO --> change the default to whatever was last on out of homescreen and navbar 
    // when a button is clicked (home or a tab) save to local storage and retreive the last value 
    // do the same with minimize 

    /* can't do this with local storage
    const savedMinimize = localStorage.getItem('minimizedStored');
    if (savedMinimize) {
      setMinimize(savedMinimize);
    }
      */

    
    //setMinimize('yes'); // default to minimized
    setHome('yes'); // default to homescreen --> TODO create variable to store the last page that was selected (not including minimize)
  }, []);

  const handleClick = async () => {
      setMinimize(!screenMinimize);
      //localStorage.setItem('minimizedStored', screenMinimize);
  };

  const handleHomeClick = async () => {
    if(goHome == 'yes'){
      setHome('yes2');
    }
    else{
      setHome('yes');
    }
  };

  // add routing info 
  return (
    <div className={screenMinimize ? 'minimized' : 'sidebar'}>
      <button onClick={handleClick} style={{ fontSize: '18px', float: 'right' }}>
        {screenMinimize ? '➡️' : '⬅️'}
      </button>
      {screenMinimize && <Minimized_view/>}
      {!screenMinimize && <button style={{ fontSize: '18px', float: 'right' }}>⚙️</button>} 
      {!screenMinimize && <button onClick={handleHomeClick} style={{ fontSize: '18px' , float: 'right'}}>🏠</button>} 
      <br></br>
      <br></br>
      {!screenMinimize &&  <Navbar goHome={goHome}/>}
    </div>
  );
}

export default App;
