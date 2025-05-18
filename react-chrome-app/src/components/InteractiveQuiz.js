import React, { useState, useEffect } from 'react';
import quizQuestions from './quizData';

function InteractiveQuiz() {
  const [userResponses, setUserResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(''); // Initial answer state
  const [quizOn, setQuizOn] = useState(false);
  const [showResult, setShowResult] = useState(false);

    // Load saved preferences on mount and set initial user responses
  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem('quizUserPreferences'));
  
    if (savedResponses && savedResponses.length > 0) {
      setUserResponses(savedResponses);
      // Pre-fill the answer for the first question
      setUserAnswer(savedResponses[currentQuestionIndex]?.userAnswer || '');
    }
  }, [currentQuestionIndex]); // Re-run only when currentQuestionIndex changes

  // Start the quiz
  const startQuiz = () => {
    setQuizOn(true);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setUserAnswer(''); // Clear any pre-filled answers on start
  };

  // Handle selecting an answer
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

  // Go to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Pre-fill the next answer from saved responses (if available)
      setUserAnswer(userResponses[currentQuestionIndex + 1]?.userAnswer || '');
    } else {
      setShowResult(true);
    }
  };

  // Reset quiz to close it
  const resetQuiz = () => {
    setQuizOn(false);
    setShowResult(false);
    setUserResponses([]);
    setUserAnswer('');
  };

  // Ensure quizQuestions[currentQuestionIndex] exists before rendering it
  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div>
      {/* Show the Start Quiz button only if the quiz hasn't been started or is incomplete */}
      {!quizOn && !showResult ? (
        <button className="vibrantButton" onClick={startQuiz}>
          Start Interactive Quiz
        </button>
      ) : showResult ? (
        <div>
          <span className = "topicHeader">Quiz</span>
          <h2>Your Preferences Summary</h2>
          <div style={{ textAlign: 'left' }}>
          <ul>
            {userResponses.map((response, idx) => (
              <li key={idx}>
                <div className="requirementFieldWrapper">
                  <strong className = "quizField">{response.question}</strong>
                  <span className="quizInputField">{response.userAnswer}</span>
                </div>
              </li>
            ))}
          </ul>
          </div>
          <button class="buttonStyle" onClick={resetQuiz}>Close Quiz</button>
        </div>
      ) : currentQuestion ? (
        <div>
          <span className = "topicHeader">Quiz</span>
          <h3>{currentQuestion.question}</h3>
          {currentQuestion.type === 'multiple' ? (
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
          ) : (
            <div>
              <input
                className="quizInputField"
                type={currentQuestion.type}
                value={userAnswer}
                onChange={(e) => handleAnswer(e.target.value)}
              />
            </div>
          )}
          <br></br>
          <button class="buttonStyle" onClick={nextQuestion} disabled={!userAnswer}>
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