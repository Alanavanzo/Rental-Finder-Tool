import React, { useEffect, useState } from 'react';
import Requirements from '../components/Requirements';
import QuizInput from '../components/QuizInput';
import InteractiveQuiz from '../components/InteractiveQuiz';

const Quiz = () => {

  return (
    <div>
      <Requirements/>
      <br></br>
      <QuizInput />
      <br></br>
      <InteractiveQuiz/>
      <br></br>
      <div className="tooltip-container">
        <span className="info-icon">ℹ️</span>
        <div className="tooltip-text">This data will help us understand your unique preferences and requirements, so that we can help evaluate whether properties are suitable for you 😊</div>
      </div>
    </div>
  );
};

// Export the component
export default Quiz;