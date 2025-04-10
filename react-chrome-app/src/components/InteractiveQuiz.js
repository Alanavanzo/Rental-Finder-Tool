import React, { useState, useEffect } from 'react';
import quizQuestions from './quizData';

function InteractiveQuiz() {
  const [userResponses, setUserResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizOn, setQuizOn] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem('quizUserPreferences'));

    if (savedResponses && savedResponses.length > 0) {
      setUserResponses(savedResponses);
      setQuizOn(true);

      if (savedResponses.length === quizQuestions.length) {
        setShowResult(true);
      } else {
        const nextIndex = savedResponses.length;
        setCurrentQuestionIndex(nextIndex);
        setUserAnswer(savedResponses[nextIndex]?.userAnswer || '');
      }
    }
  }, []);

  const startQuiz = () => {
    setQuizOn(true);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setUserResponses([]);
    setShowResult(false);
  };

  const handleAnswer = (option) => {
    setUserAnswer(option);

    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestionIndex] = {
      question: quizQuestions[currentQuestionIndex].question,
      options: quizQuestions[currentQuestionIndex].options,
      userAnswer: option
    };

    setUserResponses(updatedResponses);
    localStorage.setItem('quizUserPreferences', JSON.stringify(updatedResponses));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer(userResponses[currentQuestionIndex + 1]?.userAnswer || '');
    } else {
      setShowResult(true);
    }
  };

  // Ensure quizQuestions[currentQuestionIndex] exists before rendering it
  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div>
      {!quizOn ? (
        <button className="vibrantButton" onClick={startQuiz}>
          Start Interactive Quiz
        </button>
      ) : showResult ? (
        <div>
          <h2>Your Preferences Summary</h2>
          <ul>
            {userResponses.map((response, idx) => (
              <li key={idx}>
                <strong>{response.question}</strong><br />
                <span>{response.userAnswer}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => setQuizOn(false)}>Edit Preferences</button>
        </div>
      ) : currentQuestion ? (
        <div>
          <h3>{currentQuestion.question}</h3>
          <ul>
            {currentQuestion.options.map((option, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleAnswer(option)}
                  style={{
                    backgroundColor: userAnswer === option ? '#d3eafd' : '',
                    fontWeight: userAnswer === option ? 'bold' : 'normal'
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={nextQuestion} disabled={!userAnswer}>
            {currentQuestionIndex + 1 === quizQuestions.length ? "Finish" : "Next"}
          </button>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}

export default InteractiveQuiz;
