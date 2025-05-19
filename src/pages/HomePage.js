import React, { useState, useEffect } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import Header from "./Header";
import Footer from "../components/Footer";
import "../styles/homepage.css";
import socket from "../socket";
import {
  getHomePageQuizzesRadom,
  getRecentlyPlayedQuizzes,
  getHomePagePopularQuizzes,
} from "../services/api";

function HomePage() {
  const [randomSelectionQuizzes, setRandomSelectionQuizzes] = useState([]);
  const [popularAmongPeopleQuizzes, setPopularAmongPeopleQuizzes] = useState([]);
  const [recentlyPlayedQuizzes, setRecentlyPlayedQuizzes] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        const [randomRes, popularRes, recentRes] = await Promise.all([
          getHomePageQuizzesRadom(),
          getHomePagePopularQuizzes(),
          getRecentlyPlayedQuizzes(),
        ]);

        const format = (quiz, defaultImg = "/default.jpg") => ({
          id: quiz.quiz_id,
          title: quiz.title,
          author: quiz.users || "Unknown",
          image: quiz.image || defaultImg,
          plays: quiz.play_count || "0",
        });

        setRandomSelectionQuizzes(randomRes.data.map((q) => format(q)));
        setPopularAmongPeopleQuizzes(popularRes.data.map((q) => format(q)));
        setRecentlyPlayedQuizzes(recentRes.data.map((q) => format(q)));
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    if (location.pathname === "/" || location.pathname === "/Home") {
    fetchAllQuizzes();
  }
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Navigation />
      <main className="main-content-homepage">
        <HeroSection />
        <QuizSection
          title="Recently published"
          buttonText="Play Now"
          quizzes={recentlyPlayedQuizzes}
        />
        <QuizSection
          title="Popular among people for all"
          buttonText="Play Now"
          quizzes={popularAmongPeopleQuizzes}
        />
        <VoteSection />
        <QuizSection
          title="Random selection"
          buttonText="Play Now"
          quizzes={randomSelectionQuizzes}
        />
      </main>
      <Footer />
    </>
  );
}

function Navigation() {
  const navigate = useNavigate();
  const navItems = [
    { icon: "🏠", label: "Home", path: "/Home" },
    { icon: "🏆", label: "Leaderboard", path: "/leaderboard" },
    { icon: "⭐", label: "Entertainment", path: "/entertainment" },
    { icon: "🏠", label: "History", path: "/history" },
    { icon: "🔍", label: "Languages", path: "/languages" },
    { icon: "💰", label: "Science & Nature", path: "/sciencenature" },
    { icon: "🎮", label: "Sports", path: "/sports" },
  ];

  return (
    <nav className="main-nav">
      <div className="nav-container-homepage">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="nav-item"
            onClick={() => item.path && navigate(item.path)}
          >
            <div className="nav-icon">{item.icon}</div>
            <div className="nav-label">{item.label}</div>
          </div>
        ))}
      </div>
    </nav>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  return (
      <div className="hero-card create-quiz">
        <div className="hero-content">
          <img src="https://s3.ap-southeast-2.amazonaws.com/relux.cloude.com/chibi_student_canvas_430x300_hex_fee9c3.png" alt="Character" className="hero-image" />
          <div className="hero-text">
            <h2>Create a quiz</h2>
            <p>Play for free with 500 participants</p>
            <button className="hero-btn" onClick={() => navigate("/create-quiz")}>
              Quiz editor
            </button>
          </div>
        </div>
      </div>
  );
}

function QuizSection({ title, buttonText, quizzes }) {
  return (
    <section className="quiz-section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div className="quiz-grid">
        {quizzes.map((quiz, index) => (
          <QuizCard key={index} quiz={quiz} buttonText={buttonText} />
        ))}
      </div>
    </section>
  );
}

function QuizCard({ quiz, buttonText }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.username || "Người chơi";
  const handlePlayNow = () => {
    const quizId = quiz.id;

    socket.emit("createRoom", name, quizId);

    socket.once("roomCreated", (roomId) => {
      navigate(`/waiting-room/${roomId}`, {
        state: {
          quizId,
          isHost: true,
          playerName: name,
        },
      });
    });
  };

  return (
    <div className="quiz-card">
      <div className="quiz-image-container">
        <img src={quiz.image} alt={quiz.title} className="quiz-image" />
      </div>
      <div className="quiz-details">
        <button className="play-btn" onClick={handlePlayNow}>
          {buttonText}
        </button>
        <h3 className="quiz-title">{quiz.title}</h3>
        <div className="quiz-meta">
          <span className="by-author">By {quiz.author}</span>
          <span className="participants">{quiz.plays} Plays</span>
        </div>
      </div>
    </div>
  );
}

function VoteSection() {
  return (
    <section className="vote-section">
      <div className="vote-content">
        <h2>Can't decide? Let players vote</h2>
        <button className="vote-btn">Start vote mode</button>
      </div>
    </section>
  );
}

export default HomePage;
