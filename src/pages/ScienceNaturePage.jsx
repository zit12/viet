import React, { useState } from "react";
import Header from "../pages/Header";
import Footer from "../components/Footer";
import ScienceNatureQuizGame from "../components/ScienceNatureQuizGame";
import "../assets/styles/ScienceNature.css";

function ScienceNaturalPage() {
  const [showGame, setShowGame] = useState(false);
  const scienceQuizzes = [
    {
      id: 1,
      title: "Nature and Earth Quiz",
      plays: 1400,
      likes: 620,
      date: "February 20, 2024",
      image: "/science1.jpg",
      description: "Explore the wonders of nature and Earth with this quiz!",
    },
    {
      id: 2,
      title: "Solar System Facts",
      plays: 1600,
      likes: 700,
      date: "February 19, 2024",
    },
    {
      id: 3,
      title: "Physics for Beginners",
      plays: 1300,
      likes: 500,
      date: "February 18, 2024",
    },
    {
      id: 4,
      title: "Biology Basics",
      plays: 1250,
      likes: 550,
      date: "February 17, 2024",
    },
    {
      id: 5,
      title: "Chemical Elements Quiz",
      plays: 1450,
      likes: 610,
      date: "February 16, 2024",
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
            <ScienceNatureQuizGame />
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
          <h1>Science & Nature Quizzes</h1>
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
              src={scienceQuizzes[0].image}
              alt={scienceQuizzes[0].title}
              className="featured-image"
            />
            <div className="featured-details">
              <h2>{scienceQuizzes[0].title}</h2>
              <p>{scienceQuizzes[0].description}</p>
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
          {scienceQuizzes.map((quiz) => (
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

export default ScienceNaturalPage;
