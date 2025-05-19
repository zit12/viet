import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/WaitingRoomPage.css";
import socket from "../socket";
import { playQuiz } from "../services/api";

export default function WaitingRoomPage(props) {
  const [showRoomId, setShowRoomId] = useState(true);
  const { roomId: urlRoomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const roomId = props.roomId || urlRoomId;
  const quizId = props.quizId || location.state?.quizId;
  const isHost = props.isHost ?? location.state?.isHost;
  const initialPlayers = props.players || location.state?.players || [];

  const [players, setPlayers] = useState(initialPlayers);
  const [maxWidth, setMaxWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    socket.on("updatePlayers", (playersList) => {
      setPlayers(playersList);
    });

    socket.on("gameStarted", () => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => ({ ...player, status: "playing" }))
      );
      navigate(`/game-room/${roomId}?isHost=${isHost}`);
    });

    socket.on("newQuestion", () => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => ({ ...player, status: "playing" }))
      );
      navigate(`/game-room/${roomId}?isHost=${isHost}`);
    });

    socket.on("currentQuestion", (questionData) => {
      if (questionData) {
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) => ({ ...player, status: "playing" }))
        );
        navigate(`/game-room/${roomId}?isHost=${isHost}`, { state: { question: questionData } });
      }
    });

    if (roomId) {
      socket.emit("getPlayers", roomId);
    }

    return () => {
      socket.off("updatePlayers");
      socket.off("gameStarted");
      socket.off("newQuestion");
      socket.off("currentQuestion");
    };
  }, [roomId, navigate, isHost]);

  useEffect(() => {
    if (!containerRef.current) return;
    const playerElements = containerRef.current.querySelectorAll(".player-name");
    let max = 0;
    playerElements.forEach((el) => {
      const w = el.scrollWidth;
      if (w > max) max = w;
    });
    setMaxWidth(max);
  }, [players]);

  const mid = Math.ceil(players.length / 2);
  const leftColumn = players.slice(0, mid);
  const rightColumn = players.slice(mid);
  const isTwoColumns = players.length > 8;
  const playerStyle = maxWidth ? { width: maxWidth + 20 } : {};

  const handleStartGame = async () => {
    try {
      console.log("Việt gửi khi bấm start:",quizId );
      await playQuiz(quizId);
      socket.emit("startGame", roomId);
    } catch (error) {
      console.error("Failed to update play count:", error);
      alert("Failed to start the game. Please try again.");
    }
  };

  return (
    <div className="waiting-wrapper">
      <div className="left-panel">
        <p className="waiting-pin-label">PIN code:</p>
        {showRoomId ? (
          <p className="waiting-pin-number">{roomId}</p>  
        ) : (
          <p className="waiting-pin-number">••••••</p>
        )}
        <button className="waiting-start-btn" onClick={() => (window.location.href = "http://localhost:3001")}>HomePage</button>
        <div className="waiting-pin-actions">
          <button  className="waiting-link-btn" onClick={() => navigator.clipboard.writeText(roomId)}> 🔗 Copy  </button>
          <button className="waiting-link-btn" onClick={() => setShowRoomId(!showRoomId)}> {showRoomId ? "🙈 Hide" : "👁️ Show"} </button>
        </div>

        <p className="waiting-text">Waiting for players</p>

        <div
          className={`players-list ${isTwoColumns ? "two-columns" : ""}`}
          ref={containerRef}
        >
          {players.length === 0 ? (
            <p>No players have joined yet.</p>
          ) : isTwoColumns ? (
            <>
              <div className="column">
                {leftColumn.map((player, index) => (
                  <p key={index} className="player-name" style={playerStyle}>
                    {player.name}{" "}
                    {player.status === "waiting" ? "🕒 Waiting" : "🎮 Playing"}
                  </p>
                ))}
              </div>
              <div className="column">
                {rightColumn.map((player, index) => (
                  <p key={index} className="player-name" style={playerStyle}>
                    {player.name}{" "}
                    {player.status === "waiting" ? "🕒 Waiting" : "🎮 Playing"}
                  </p>
                ))}
              </div>
            </>
          ) : (
            players.map((player, index) => (
              <p key={index} className="player-name" style={playerStyle}>
                {player.name}{" "}
                {player.status === "waiting" ? "🕒 Waiting" : "🎮 Playing"}
              </p>
            ))
          )}
        </div>

        {isHost && (
          <button className="waiting-start-btn" onClick={handleStartGame}>
            Start game
          </button>
        )}
      </div>
    </div>
  );
}
