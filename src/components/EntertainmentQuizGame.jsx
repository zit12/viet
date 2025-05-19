import React, { useState } from "react";
import "../assets/styles/EntertainmentQuizGame.css";

function EntertainmentQuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      image: "/movie1.jpg",
      question:
        'Which actor played the lead role in the movie "The Godfather"?',
      options: ["Al Pacino", "Marlon Brando", "Robert De Niro", "James Caan"],
      correct: "Marlon Brando",
    },
    {
      image: "/music1.jpg",
      question: 'Who is known as the "King of Pop"?',
      options: ["Elvis Presley", "Michael Jackson", "Prince", "Madonna"],
      correct: "Michael Jackson",
    },
    {
      image: "/tv1.jpg",
      question: 'Which TV show features the character "Walter White"?',
      options: ["Breaking Bad", "The Sopranos", "Game of Thrones", "The Wire"],
      correct: "Breaking Bad",
    },
    {
      image: "/award1.jpg",
      question: "Which movie won the Best Picture Oscar in 2020?",
      options: ["Parasite", "1917", "Joker", "Once Upon a Time in Hollywood"],
      correct: "Parasite",
    },
    {
      image: "/celebrity1.jpg",
      question: "Who is the highest-paid actor of 2023?",
      options: [
        "Tom Cruise",
        "Dwayne Johnson",
        "Robert Downey Jr",
        "Leonardo DiCaprio",
      ],
      correct: "Dwayne Johnson",
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
        <img
          src={currentQ.image}
          alt="Entertainment"
          className="entertainment-image"
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

export default EntertainmentQuizGame;
