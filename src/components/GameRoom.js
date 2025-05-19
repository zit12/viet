import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/GameRoom.css";
import socket from "../socket";

export default function GameRoom() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // Chỉ host khi giá trị isHost là "true"
  const isHost = queryParams.get("isHost") === "true";

  const { roomId } = useParams();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [allAnswered, setAllAnswered] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [scores, setScores] = useState([]);
  const [finalScores, setFinalScores] = useState([]);
  const [winner, setWinner] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("newQuestion", (data) => {
      setQuestion(data.question);
      setOptions(data.answers);
      setAnswered(false);
      setSelectedAnswerIndex(null);
      setCorrectAnswerIndex(null);
      setAllAnswered(false);
      setSeconds(data.timer);
      setStartTime(Date.now());
      setIsPaused(false);
    });

    socket.on("answerResult", (data) => {
      setScores(data.scores);
      setCorrectAnswerIndex(data.correctAnswer);

      setFinalScores((prevFinalScores) => {
        const updatedScores = [...prevFinalScores];
        data.scores.forEach((newPlayer) => {
          const idx = updatedScores.findIndex((p) => p.name === newPlayer.name);
          if (idx !== -1) {
            updatedScores[idx].score = newPlayer.score;
          } else {
            updatedScores.push({ name: newPlayer.name, score: newPlayer.score });
          }
        });
        return updatedScores;
      });

      setAllAnswered(true);

      setTimeout(() => {
        setCorrectAnswerIndex(null);
        setAnswered(false);
        setSelectedAnswerIndex(null);
        setAllAnswered(false);
        // Không reset isPaused ở đây để nếu host đã pause thì game vẫn ở trạng thái pause
      }, 3000);
    });

    socket.on("gameOver", (data) => {
      setWinner(data.winner);
      setFinalScores(data.scores ?? finalScores);
      setIsPaused(true);
    });

    // Lắng nghe sự kiện pause/resume từ server để đồng bộ trạng thái trên client
    socket.on("gamePaused", () => {
      setIsPaused(true);
    });

    socket.on("gameResumed", () => {
      setIsPaused(false);
      setStartTime(Date.now());
    });

    if (roomId) {
      socket.emit("getPlayers", roomId);
    }

    return () => {
      socket.off("newQuestion");
      socket.off("answerResult");
      socket.off("gameOver");
      socket.off("gamePaused");
      socket.off("gameResumed");
    };
  }, [roomId, finalScores]);

  useEffect(() => {
    if (seconds === 0 || isPaused) return;
    const timerId = setInterval(() => {
      setSeconds((sec) => sec - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [seconds, isPaused]);

  const handleAnswer = (index) => {
    if (answered) return;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    setSelectedAnswerIndex(index);
    socket.emit("submitAnswer", roomId, index, timeTaken);
    setAnswered(true);
  };

  const handleBackHome = () => {
    navigate("/Home");
  };

  const togglePause = () => {
    if (!isHost) return;
    if (isPaused) {
      setIsPaused(false);
      socket.emit("resumeGame", roomId);
    } else {
      setIsPaused(true);
      socket.emit("pauseGame", roomId);
    }
  };

  if (winner) {
    return (
      <div id="game-root">
        <h1>🎉 Winner is {winner} 🎉</h1>
        {finalScores.length > 0 ? (
          <div className="game-final-report">
            <h2>Final Scores</h2>
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {finalScores.map((player, idx) => (
                  <tr key={idx}>
                    <td>{player.name}</td>
                    <td>{player.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="back-home-btn" onClick={handleBackHome}>
              Back to Home
            </button>
          </div>
        ) : (
          <p>No final scores available.</p>
        )}
      </div>
    );
  }

  return (
    <div id="game-root">
      <div className="game-quiz-div">
        <p className="game-remaining-time">⏳ Remaining Time: {seconds}s</p>
        {isHost && (
          <button
            className="pause-btn"
            onClick={togglePause}
            type="button"
            style={{ marginBottom: "10px" }}
          >
            {isPaused ? "▶️ Resume" : "⏸ Pause"}
          </button>
        )}
        <div className="game-question">
          <p className="game-question-text">{question}</p>
        </div>
        <ul className="game-ul">
          {options.map((answer, idx) => {
            let className = "game-options";
            if (correctAnswerIndex === idx) {
              className += " game-correct";
            }
            if (selectedAnswerIndex === idx && (answered || !allAnswered)) {
              className += " game-selected-highlight";
            }
            return (
              <li key={idx} className="game-li">
                <button
                  className={className}
                  onClick={() => handleAnswer(idx)}
                  disabled={answered && allAnswered}
                >
                  {answer.text}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="game-scores">
          {scores.map((player, idx) => (
            <p key={idx}>
              {player.name}: {player.score}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
