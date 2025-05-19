import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./HeaderMyquizz";
import Footer from "../components/Footer";
import "../styles/myquizz.css";
import socket from "../socket";
import { getQuizzesByUser } from "../services/api";

function MyQuizz() {
  const [quizzes, setQuizzes] = useState([]);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const userId = localStorage.getItem("user_ID");
        if (!userId) return console.error("User ID not found");

        const res = await getQuizzesByUser(userId); // ✅ dùng API đã export
        setQuizzes(res.data.data || []);
      } catch (error) {
        console.error("Failed to load quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const name = user?.username || "Người chơi";
    const handlePlayNow = (quizId) => {
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
    <div className="page-container">
      <Header />
      <main className="main-content-homepage">
        <div className="category-header">
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

        <div className="quiz-list">
          {quizzes.map((quiz) => (
            <div key={quiz.quiz_id} className="quiz-item">
              <img
                src={quiz.image}
                alt={quiz.title}
                className="quiz-thumbnail"
              />
              <div className="quiz-details">
                <h3>{quiz.title}</h3>
                <p>
                  <span>Plays: {quiz.play_count}</span> |{" "}
                  <span>{quiz.create_date}</span>
                </p>
                <button
                  className="play-btn"
                  onClick={() => handlePlayNow(quiz.quiz_id)}
                >
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

export default MyQuizz;
