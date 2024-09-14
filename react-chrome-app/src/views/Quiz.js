import React, { useEffect, useState } from 'react';
import QuizInput from '../components/QuizInput';

const Quiz = () => {
    // create variables to reference user input 

  return (
    <div>
      <header>
        <h3>This data will help us understand your unique preferences and requirements, so that we can help evaluate whether properties are suitable for you 😊</h3>
        <br></br>
      </header>
      <QuizInput />
    </div>
  );
};

// Export the component
export default Quiz;