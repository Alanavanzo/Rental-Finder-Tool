import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

const globalStyles = document.createElement("style");
/* this is what is currently making it look like an extension */
globalStyles.innerHTML = `
  #${rootElement.id} {
  position: fixed;
  left: 0;
  top: 0;
  background: 'none';
  z-index: 999999999;
  }
`;

/* original code
globalStyles.innerHTML = `
  #${rootElement.id} {
  position: fixed;
  left: 0;
  top: 0;
  width: 300px; 
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #c2c2c2;
  z-index: 999999999;
  }
`;
*/

document.body.appendChild(rootElement);
document.body.appendChild(globalStyles);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
  position: fixed;
  left: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #c2c2c2;

  z-index: 999;
  }
`;
rootElement.appendChild(globalStyles);
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

*/

