import React, { useState } from "react";
import "../assets/styles/LanguageQuizGame.css";

function LanguageQuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      image: "/language1.jpg",
      question: "What is the official language of Brazil?",
      options: ["Spanish", "Portuguese", "French", "English"],
      correct: "Portuguese",
    },
    // Add more language questions here
  ];

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="quiz-game-container">
        <div className="result-screen">
          <h2>Quiz Complete!</h2>
          <p>
            Your Score: {score} out of {questions.length}
          </p>
          <button className="restart-btn" onClick={restartGame}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="quiz-game-container">
      <div className="game-header">
        <div className="score">Score: {score}</div>
        <div className="question-counter">
          Question {currentQuestion + 1}/{questions.length}
        </div>
      </div>

      <div className="question-section">
        <img
          src={currentQ.image}
          alt="Language Quiz"
          className="player-image"
        />
        <h2 className="question-text">{currentQ.question}</h2>
      </div>

      <div className="options-grid">
        {currentQ.options.map((option, index) => (
          <button
            key={index}
            className="option-btn"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageQuizGame;
