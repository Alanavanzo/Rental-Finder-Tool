import React, { useState } from 'react';
import "../styling/Navbar.css"
import Homepage from "./Homepage.js";  // homepage is tab 1 
import Quiz from './Quiz';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('tab1'); // default to homepage

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <nav className="tab-nav">
        <ul className="tab-list" role="tablist" aria-orientation="horizontal">
          <li>
            <button
              role="tab"
              id="tab-1"
              className="tabStyle"
              aria-controls="panel-1"
              aria-selected={activeTab === 'tab1'}
              onClick={() => handleTabClick('tab1')}
            >
              Homepage
            </button>
          </li>
          <li>
            <button
              role="tab"
              id="tab-2"
              className="tabStyle"
              aria-controls="panel-2"
              aria-selected={activeTab === 'tab2'}
              onClick={() => handleTabClick('tab2')}
            >
              Quiz
            </button>
          </li>
          <li>
            <button
              role="tab"
              id="tab-3"
              className="tabStyle"
              aria-controls="panel-3"
              aria-selected={activeTab === 'tab3'}
              onClick={() => handleTabClick('tab3')}
            >
              Favourites
            </button>
          </li>
        </ul>
      </nav>
      <div className="tab-content">
        {activeTab === 'tab1' && <div id="panel-1"><Homepage/></div>}
        {activeTab === 'tab2' && <div id="panel-2"><Quiz/></div>}
        {activeTab === 'tab3' && <div id="panel-2">Stay tuned .. this window will enable you to access all your favourite properties from multiple platforms in the one place!</div>}
      </div>
    </div>
  );
};

export default Navbar;
