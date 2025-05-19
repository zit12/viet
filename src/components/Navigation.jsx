import React from 'react';
import '../assets/styles/Navigation.css'; // Adjust the path as necessary

function Navigation() {
  const navItems = [
    { icon: "🏠", label: "A to Z Quizzes" },
    { icon: "🏆", label: "Leaderboard" },
    { icon: "⭐", label: "Select a fix" },
    { icon: "🏠", label: "Home" },
    { icon: "🔍", label: "Lockscan" },
    { icon: "💰", label: "Balance & More" },
    { icon: "🎮", label: "Sports" }
  ];

  return (
    <nav className="main-nav">
      <div className="nav-container">
        {navItems.map((item, index) => (
          <div key={index} className="nav-item">
            <div className="nav-icon">{item.icon}</div>
            <div className="nav-label">{item.label}</div>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;