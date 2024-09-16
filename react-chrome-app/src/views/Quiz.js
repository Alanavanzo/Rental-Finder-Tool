import React, { useEffect, useState } from 'react';
import Requirements from '../components/Requirements';
import QuizInput from '../components/QuizInput';

const Quiz = () => {

  return (
    <div>
      <header>
        <h3>This data will help us understand your unique preferences and requirements, so that we can help evaluate whether properties are suitable for you 😊</h3>
        <br></br>
      </header>
      <Requirements/>
      <br></br>
      <QuizInput />
    </div>
  );
};

// Export the component
export default Quiz;