import React, { useState } from 'react';
import "../styling/Navbar.css"
import WelcomeUser from "../views/Homepage.js";
import UserInputTest1 from "../views/UserInputTest.js";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('tab1');

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
              aria-controls="panel-1"
              aria-selected={activeTab === 'tab1'}
              onClick={() => handleTabClick('tab1')}
            >
              Tab 1
            </button>
          </li>
          <li>
            <button
              role="tab"
              id="tab-2"
              aria-controls="panel-2"
              aria-selected={activeTab === 'tab2'}
              onClick={() => handleTabClick('tab2')}
            >
              Tab 2
            </button>
          </li>
          <li>
            <button
              role="tab"
              id="tab-3"
              aria-controls="panel-3"
              aria-selected={activeTab === 'tab3'}
              onClick={() => handleTabClick('tab3')}
            >
              Tab 3
            </button>
          </li>
        </ul>
      </nav>
      <div className="tab-content">
        {activeTab === 'tab1' && <div id="panel-1"><WelcomeUser/><UserInputTest1 /></div>}
        {activeTab === 'tab2' && <div id="panel-2">Content for Tab 2</div>}
        {activeTab === 'tab3' && <div id="panel-3">Content for Tab 3</div>}
      </div>
    </div>
  );
};

export default Navbar;
