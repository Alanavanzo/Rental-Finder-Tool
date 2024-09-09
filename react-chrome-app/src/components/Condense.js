import React, { useEffect, useState } from 'react';

// this is the code responsible for MINIMIZING, it is NOT the condensed view, hence why it is in components 
const Condense = () => {
  const minimizeExtension = () => {
    if (chrome && chrome.windows) {
      chrome.windows.getCurrent((window) => {
        chrome.windows.update(window.id, { state: 'minimized' });
      });
    }
  };

  return (
    <button onClick={minimizeExtension}> {/*Reload page as App.tsx should have if statement checking if it isminimized == true */}
      Minimize Extension
    </button>
  );
};

export default Condense;