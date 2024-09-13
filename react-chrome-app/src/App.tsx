import React, { useState, useEffect } from 'react';
import Navbar from "./views/Navbar.js";
import Minimize from "./components/Minimize.js";
import Minimized_view from './views/Minimized_view.js';
import { ReactDOM } from "react";
import "./App.css"
import "./styling/Styles.css"
import Homepage from './views/Homepage.js';

function App() {
  const [screenMinimize, setMinimize] = useState('');
  const [goHome, setHome] = useState('');

  useEffect(() => {

    const savedMinimize = 'yes'; // default to minimized
    if (savedMinimize) {
      setMinimize(savedMinimize);
    }

    const savedHome = 'yes'; // default to homescreen
    if (savedHome) {
      setHome(savedHome);
    }

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
    if(goHome == 'no'){
      setHome('yes');
      //window.location.reload();
    }
    else{
      setHome('no');
    }
    localStorage.setItem('homeScreen', goHome);
  };

  // add routing info 
  return (
    <div className={screenMinimize == 'yes' ? 'minimized' : 'sidebar'}>
      {screenMinimize == 'no' && <button onClick={handleHomeClick} style={{ fontSize: '18px' }}>🏠</button>} 
      <button onClick={handleClick} style={{ fontSize: '18px' }}>
      {screenMinimize == 'yes' ? '➡️' : '⬅️'}
      </button>
      {screenMinimize =='yes' && <Minimized_view/>}
      {screenMinimize =='no' && goHome == 'yes' && <Navbar goHome={'yes'}/>}
      {screenMinimize =='no' && goHome == 'no' && <Navbar goHome={'no'}/>}
        {/*<Minimize/>*/} 
        {/* TODO: we need two scenarios here: if is minimized and if is not minimized --> the below only shows if is not minimzied */}
        {/*<Condense/>*/}


        {/*<WelcomeUser/>*/}
    </div>
  );
}

export default App;
/*
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/