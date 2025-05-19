// QuizSettingsPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/QuizSettingsPage.css";

export default function QuizSettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="quiz-settings-page">
      {/* Header */}
      <div className="quiz-settings-header">
        <div className="quiz-settings-header-left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <button
            className="btn-back-quiz-settings"
            onClick={() => navigate("/quiz-editor")}
          >
            ← Back to Quiz
          </button>
        </div>
        <div className="quiz-settings-header-right">
          <button className="btn-preview-quiz-settings">Preview</button>
          <button className="btn-done-quiz-settings">Done</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="quiz-settings-main-content">
        {/* Left - Media Section */}
        <div className="quiz-settings-media-section">
          <div className="quiz-settings-media-box">
            <button className="btn-add-media-quiz-settings">Add media</button>
            <button className="btn-generate-ai-quiz-settings">⚡ Generate with AI</button>
          </div>
        </div>

        {/* Right - Form Section */}
        <div className="quiz-settings-form-section">
          {/* Quiz Name */}
          <div className="quiz-settings-form-group">
            <label className="quiz-settings-label">Quiz name</label>
            <input className="quiz-settings-input" placeholder="Enter quiz name" />
          </div>

          {/* Description */}
          <div className="quiz-settings-form-group">
            <label className="quiz-settings-label">Description</label>
            <textarea className="quiz-settings-input" placeholder="Enter description" />
          </div>

          {/* Tags */}
          <div className="quiz-settings-form-group">
            <label className="quiz-settings-label">Tags</label>
            <input className="quiz-settings-input" placeholder="Add tags" />
          </div>

          {/* Language */}
          <div className="quiz-settings-form-group">
            <label className="quiz-settings-label">Question language</label>
            <select className="quiz-settings-select">
              <option>English</option>
              <option>Vietnamese</option>
            </select>
          </div>

          {/* Visibility */}
          <div className="quiz-settings-form-group">
            <label className="quiz-settings-label">Visibility</label>
            <select className="quiz-settings-select">
              <option>Private (visible only to you)</option>
              <option>Unlisted (public but not listed)</option>
              <option>Publish - Only available in English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="quiz-settings-footer">
        <button className="btn-settings-quiz-settings">Settings</button>
        <button className="btn-add-slide-quiz-settings">+</button>
      </div>
    </div>
  );
}
