import sayHello from "./views/Test.js";
import WelcomeUser from "./views/Homepage.js";
import Hello from './views/Hello.js'; // Adjust path as needed
import UserInputTest1 from "./views/UserInputTest.js";

function App() {
  return (
    <div>
        <WelcomeUser/>
        {/*<h1>{sayHello()}</h1>*/}
        {/*<Hello />*/}
        <UserInputTest1 />
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