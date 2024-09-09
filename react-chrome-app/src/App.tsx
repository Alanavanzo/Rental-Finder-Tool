import React from "react";
import Navbar from "./views/Navbar.js";
import { ReactDOM } from "react";
import "./App.css"
import "./styling/Styles.css"

function App() {
  // add routing info 
  return (
    <div>
        {/* TODO: we need two scenarios here: if is minimized and if is not minimized --> the below only shows if is not minimzied */}
        {/*<Condense/>*/}
        <Navbar/> 
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