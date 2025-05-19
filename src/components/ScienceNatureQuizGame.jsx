import React, { useState } from "react";
import "../assets/styles/ScienceNatureQuizGame.css";

function ScienceNatureQuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      image: "/science1.jpg",
      question: "What planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Mercury"],
      correct: "Mars",
    },
    // Add more science questions here
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
        <img src={currentQ.image} alt="Science Quiz" className="player-image" />
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

export default ScienceNatureQuizGame;
