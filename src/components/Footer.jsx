import React from 'react';
import '../assets/styles/Footer.css'; // Adjust the path as necessary

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="discord-section">
            <img src="/discord-logo.png" alt="Join Our Discord" className="discord-logo" />
            <p className="discord-text">Join Our Discord</p>
            <div className="confetti"></div>
        </div>
        <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Topic</h4>
            <a href="#">Page</a>
            <a href="#">Page</a>
            <a href="#">Page</a>
          </div>
          <div className="footer-column">
            <h4>Topic</h4>
            <a href="#">Page</a>
            <a href="#">Page</a>
            <a href="#">Page</a>
          </div>
          <div className="footer-column">
            <h4>Topic</h4>
            <a href="#">Page</a>
            <a href="#">Page</a>
            <a href="#">Page</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;