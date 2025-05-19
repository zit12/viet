import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import "../assets/styles/HeaderMyQuizz.css";

function Header() {
  const [user, setUser] = useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Cập nhật user từ localStorage
  const updateUserState = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error parsing user data from localStorage:", err);
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  useEffect(() => {
    updateUserState();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user") updateUserState();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userStateChange", updateUserState);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userStateChange", updateUserState);
    };
  }, []);

  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
    handleSettingsClose();
  };

  const handleProfileClick = () => {
    navigate("/profile");
    handleSettingsClose();
  };

  const handleMyQuizzesClick = () => {
    navigate("/my-quizz");
    handleSettingsClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.dispatchEvent(new Event("userStateChange"));
    navigate("/login");
  };

  return (
    <header className="header-my-quizzes">
      <div className="main-header">
        <div className="logo" onClick={() => navigate("/Home")} style={{ cursor: "pointer" }}>
          NQUIZ.com
        </div>

        <div className="header-buttons">
          <IconButton
            className="settings-btn"
            aria-label="Settings"
            onClick={handleSettingsClick}
          >
            <SettingsIcon />
          </IconButton>

          <Menu
            anchorEl={settingsAnchorEl}
            open={Boolean(settingsAnchorEl)}
            onClose={handleSettingsClose}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleMyQuizzesClick}>My Quizzes</MenuItem>
            {user?.role === "admin" && (
              <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>
            )}
          </Menu>

          {user ? (
            <button className="sign-in-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="sign-in-btn" onClick={() => navigate("/login")}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
