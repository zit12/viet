import React, { useState } from "react";
import Header from "../pages/Header";
import Footer from "../components/Footer";
import LanguageQuizGame from "../components/LanguageQuizGame";
import "../assets/styles/Language.css";

function LanguagesPage() {
  const [showGame, setShowGame] = useState(false);
  const languageQuizzes = [
    {
      id: 1,
      title: "World Languages Trivia",
      plays: 1100,
      likes: 400,
      date: "March 15, 2024",
      image: "/language1.jpg",
      description: "Challenge yourself with questions about world languages!",
    },
    {
      id: 2,
      title: "French Vocabulary Quiz",
      plays: 900,
      likes: 320,
      date: "March 14, 2024",
    },
    {
      id: 3,
      title: "Japanese Kanji Challenge",
      plays: 750,
      likes: 290,
      date: "March 13, 2024",
    },
    {
      id: 4,
      title: "Spanish Grammar Fun",
      plays: 800,
      likes: 330,
      date: "March 12, 2024",
    },
    {
      id: 5,
      title: "English Idioms Test",
      plays: 1200,
      likes: 450,
      date: "March 11, 2024",
    },
  ];

  if (showGame) {
    return (
      <div className="category-page">
        <Header />
        <main className="main-content">
          <div className="game-container">
            <button className="back-btn" onClick={() => setShowGame(false)}>
              ← Back to Quizzes
            </button>
            <LanguageQuizGame />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="category-page">
      <Header />
      <main className="main-content">
        <div className="category-header">
          <h1>Language Quizzes</h1>
          <div className="filter-dropdown">
            <label htmlFor="filter">Sort by:</label>
            <select id="filter" defaultValue="Best match">
              <option>Best match</option>
              <option>Most played</option>
              <option>Most liked</option>
              <option>Newest first</option>
              <option>Oldest first</option>
            </select>
          </div>
        </div>
        <div className="featured-quiz">
          <div className="featured-content">
            <img
              src={languageQuizzes[0].image}
              alt={languageQuizzes[0].title}
              className="featured-image"
            />
            <div className="featured-details">
              <h2>{languageQuizzes[0].title}</h2>
              <p>{languageQuizzes[0].description}</p>
              <button
                className="play-now-btn"
                onClick={() => setShowGame(true)}
              >
                Play Now
              </button>
            </div>
          </div>
        </div>
        <div className="quiz-list">
          {languageQuizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-item">
              <img
                src={quiz.image}
                alt={quiz.title}
                className="quiz-thumbnail"
              />
              <div className="quiz-details">
                <h3>{quiz.title}</h3>
                <p>
                  <span>Plays: {quiz.plays}</span> |{" "}
                  <span>Likes: {quiz.likes}</span> | <span>{quiz.date}</span>
                </p>
                <button className="play-btn" onClick={() => setShowGame(true)}>
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LanguagesPage;
