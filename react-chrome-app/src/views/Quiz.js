import React, { useEffect, useState } from 'react';
import QuizInput from '../components/QuizInput';

const Quiz = () => {
    // create variables to reference user input 

  return (
    <div>
      <header>
        <h3>This quiz will help us understand your preferences and requirements for rental property</h3>
      </header>
      <QuizInput />
    </div>
  );
};

// Export the component
export default Quiz;