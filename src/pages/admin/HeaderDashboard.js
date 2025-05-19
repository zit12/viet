import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import "../../assets/styles/HeaderDashboard.css";

// Component cho phần User Profile Menu
const AvatarMenu = ({
  user,
  handleUserMenu,
  anchorEl,
  handleCloseMenu,
  handleLogout,
  handleProfile,
}) => (
  <>
    <div className="user-profile" onClick={handleUserMenu}>
      {user.avatar_url ? (
        <Avatar
          src={user.avatar_url}
          alt={user.username}
          className="user-avatar"
        />
      ) : (
        <Avatar className="user-avatar">
          {user.username?.charAt(0).toUpperCase()}
        </Avatar>
      )}
      <span className="username">{user.username}</span>
    </div>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  </>
);

function Header() {
  const [user, setUser] = useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Function to update user state from localStorage
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

  // Initial user state setup
  useEffect(() => {
    updateUserState();
  }, []);

  // Listen for login/logout events
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        updateUserState();
      }
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

  const handleHomepageClick = () => {
    navigate("/home");
    handleSettingsClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.dispatchEvent(new Event("userStateChange"));
    navigate("/login");
  };

  return (
    <header className="header-dashboard">
      <div className="main-header-dashboard">
        <div className="logo">NQUIZ Dashboard</div>

        <div className="header-dashboard-buttons">
          <IconButton
            className="settings-btn-dashboard"
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
            <MenuItem onClick={handleHomepageClick}>Home</MenuItem>
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
