import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "../socket";
import WaitingRoomPage from "./WaitingRoomPage"; // Import trang phòng chờ


function CreateRoom() {
  const [name, setName] = useState("");
  const [info, setInfo] = useState(false);
  const [roomId, setRoomId] = useState(""); // ID phòng
  const [players, setPlayers] = useState([]); // Danh sách người chơi
  const [isHost, setIsHost] = useState(false); // Xác định người tạo phòng

  // Khi người dùng tạo phòng
  const handleCreateRoom = () => {
    if (!name) {
      toast.error("Hãy nhập tên trước khi tạo phòng!");
      return;
    }
    socket.emit("createRoom", name); // Gửi yêu cầu tạo phòng
  };


  // Lắng nghe sự kiện phòng đã được tạo
  useEffect(() => {
    socket.on("roomCreated", (roomId) => {
      setRoomId(roomId);
      setInfo(true);
      setIsHost(true); // Đặt người tạo phòng là host
      toast.success(`Phòng đã được tạo thành công! ID: ${roomId}`);
    });

    // Lắng nghe sự kiện khi có người tham gia
    socket.on("updatePlayers", (playersList) => {
      console.log("Players List updated in CreateRoom:", playersList); // Kiểm tra danh sách người chơi
      setPlayers(playersList); // Cập nhật danh sách người chơi
    });

    // Lắng nghe thông báo từ server
    socket.on("message", (message) => {
      toast(message, { position: "top-right", autoClose: 3000, theme: "dark" });
    });

    return () => {
      socket.off("roomCreated");
      socket.off("updatePlayers");
      socket.off("message");
    };
  }, []);

  console.log("Room ID in CreateRoom:", roomId);
  console.log("Players in CreateRoom:", players);
  console.log("Is Host in CreateRoom:", isHost);

  return (
    <div className="App">
      <ToastContainer />
      {!info ? (
        <div className="join-div">
          <h1>QuizClash 💡</h1>
          <input
            required
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleCreateRoom} className="create-btn">
            Tạo Phòng
          </button>
        </div>
      ) : (
        <WaitingRoomPage roomId={roomId} players={players} isHost={isHost} /> // Hiển thị trang phòng chờ
      )}
    </div>
  );
}

export default CreateRoom;
