import React, { useState, useEffect } from 'react';
import "../styling/Navbar.css"
import Homepage from "./Homepage.js";  
import Quiz from './Quiz';
import Rate from './Rate';
import Chatbot from './Chatbot';
import Favourite from './Favourite';

function Navbar ( {goHomeTrigger} ) {
  // no automatic default --> captured from local storage 'mostRecentView'
  const [activeTab, setActiveTab] = useState(''); 
  const [goHomeVal, setHome] = useState(); 

  useEffect(() => {
    // on reload, grab the most recent view 
    const savedMostRecentView = localStorage.getItem('mostRecentView');
    if (savedMostRecentView == null || savedMostRecentView == 'home') { // defaults to home if nothing in local storage 
      setActiveTab('')
      setHome(true);
    }
    else{
      setHome(false)
      setActiveTab(savedMostRecentView);
    }
  }, [goHomeTrigger]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setHome(false)
    localStorage.setItem('mostRecentView', tab);  // set the most recent view to the tab 
  };

  return (
      <div className="tabs">
        <nav className="tab-nav">
          <ul className="tab-list" role="tablist" aria-orientation="horizontal">
            <li>
              <button
                role="tab"
                id="tab-1"
                className={activeTab==='tab1' ? "activeTabStyle" : "tabStyle"}
                aria-controls="panel-1"
                aria-selected={activeTab === 'tab1'}
                onClick={() => handleTabClick('tab1')}
              >
                Quiz
              </button>
            </li>
            <li>
              <button
                role="tab"
                id="tab-2"
                className={activeTab==='tab2' ? "activeTabStyle" : "tabStyle"}
                aria-controls="panel-2"
                aria-selected={activeTab === 'tab2'}
                onClick={() => handleTabClick('tab2')}
              >
                Rate
                <span class="hoverText">Here, you can enter property info and based off of your preferences a rating will be generated!</span>
              </button>
            </li>
            <li>
              <button
                role="tab"
                id="tab-3"
                className={activeTab==='tab3' ? "activeTabStyle" : "tabStyle"}
                aria-controls="panel-3"
                aria-selected={activeTab === 'tab3'}
                onClick={() => handleTabClick('tab3')}
              >
                Chatbot
              </button>
            </li>
            <li>
              <button
                role="tab"
                id="tab-4"
                className={activeTab==='tab4' ? "activeTabStyle" : "tabStyle"}
                aria-controls="panel-4"
                aria-selected={activeTab === 'tab4'}
                onClick={() => handleTabClick('tab4')}
              >
                Favs
              </button>
            </li>
            {/*} TO CONSIDER -- could potentially add settings and home here as well
            <li>
              <button
                role="tab"
                id="tab-4"
                className="tabStyle"
                aria-controls="panel-4"
                aria-selected={activeTab === 'tab4'}
                onClick={() => handleTabClick('tab4')}
              >
                ⚙️
              </button>
            </li>
            */}
          </ul>
        </nav>
        <div className="tab-content">
          {/* pass go home in as variable to give option as active tab */}
          {goHomeVal && <Homepage/>}
          {/* originally had a check that go home == no but now page opens defaulting to home screen and 
          activeTab initialized to empty ... as soon as tabs are clicked goHomeVal becomes no so homepage won't be shown 
          if home button is clicked, the useEffect will be called and we are bacm to start where homepage is default anf activeTab is empty 
          */}
          {activeTab === 'tab1' && <div id="panel-1"><Quiz/></div>} 
          {activeTab === 'tab2' && <div id="panel-2"><Rate/></div>}
          {activeTab === 'tab3' && <div id="panel-3"><Chatbot/></div>}
          {activeTab === 'tab4' && <div id="panel-4"><Favourite/></div>}
        </div>
      </div>
  );
};

export default Navbar;
