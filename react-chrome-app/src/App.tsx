import React, { useState, useEffect } from 'react';
import Navbar from "./views/Navbar.js";
import Minimized_view from './views/Minimized_view.js';
import { ReactDOM } from "react";
import "./App.css"
import "./styling/Styles.css"
import Homepage from './views/Homepage.js';

function App() {
  const [screenMinimize, setMinimize] = useState('');
  const [goHome, setHome] = useState('');

  useEffect(() => {
    setMinimize('yes'); // default to minimized
    setHome('yes'); // default to homescreen --> TODO create variable to store the last page that was selected (not including minimize)
  }, []);

  const handleClick = async () => {
    if(screenMinimize == 'no'){
      setMinimize('yes');
    }
    else{
      setMinimize('no');
    }
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
    <div className={screenMinimize == 'yes' ? 'minimized' : 'sidebar'}>
      <button onClick={handleClick} style={{ fontSize: '18px', float: 'right' }}>
        {screenMinimize == 'yes' ? '➡️' : '⬅️'}
      </button>
      {screenMinimize =='yes' && <Minimized_view/>}
      {screenMinimize == 'no' && <button style={{ fontSize: '18px', float: 'right' }}>⚙️</button>} 
      {screenMinimize == 'no' && <button onClick={handleHomeClick} style={{ fontSize: '18px' , float: 'right'}}>🏠</button>} 
      <br></br>
      <br></br>
      {screenMinimize =='no' &&  <Navbar goHome={goHome}/>}
    </div>
  );
}

export default App;
