import React, { useState } from "react";
import "../assets/styles/HistoryQuizGame.css";

function HistoryQuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      image: "/history1.jpg",
      question: "Which ancient civilization built the Great Pyramids of Giza?",
      options: ["Romans", "Greeks", "Egyptians", "Mayans"],
      correct: "Egyptians",
    },
    {
      image: "/history2.jpg",
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correct: "1945",
    },
    {
      image: "/history3.jpg",
      question: "Who was the first President of the United States?",
      options: [
        "Thomas Jefferson",
        "John Adams",
        "George Washington",
        "Benjamin Franklin",
      ],
      correct: "George Washington",
    },
    {
      image: "/history4.jpg",
      question: "The Renaissance period began in which country?",
      options: ["France", "Germany", "Italy", "Spain"],
      correct: "Italy",
    },
    {
      image: "/history5.jpg",
      question: "Which ancient wonder was located in Babylon?",
      options: [
        "Hanging Gardens",
        "Colossus of Rhodes",
        "Lighthouse of Alexandria",
        "Temple of Artemis",
      ],
      correct: "Hanging Gardens",
    },
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
        <img src={currentQ.image} alt="History" className="history-image" />
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

export default HistoryQuizGame;
