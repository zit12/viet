// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SportsPage from "./pages/SportsPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import HistoryPage from "./pages/HistoryPage";
import LanguagesPage from "./pages/LanguagesPage";
import ScienceNaturePage from "./pages/ScienceNaturePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import { RequireAuth, RequireAdmin } from "./middleware/authMiddleware";
import Profile from "./pages/Profile";
import QuizEditorPage from "./components/QuizEditorPage";
import OneCorrectAnswer from "./components/OneCorrectAnswer";
import MultipleCorrectAnswers from "./components/MultipleCorrectAnswers";
import CreateQuiz from "./pages/CreateQuiz";
import MyQuizzes from "./pages/MyQuizzes";
import QuizSettingsPage from "./components/QuizSettingsPage";
import WaitingRoomPage from "./components/WaitingRoomPage";
import Test from "./components/test";
import GameRoom from "./components/GameRoom";
import MyQuizz from "./pages/MyQuizz";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Public Routes */}
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/languages" element={<LanguagesPage />} />
        <Route path="/sciencenature" element={<ScienceNaturePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/quiz-editor/:quizId" element={<QuizEditorPage />} />
        <Route path="/one-correct-answer/:quizId" element={<OneCorrectAnswer />} />
        <Route
          path="/multiple-correct-answers"
          element={<MultipleCorrectAnswers />}
        />
        <Route path="/quiz-settings" element={<QuizSettingsPage />} />
        <Route path="/waiting-room/:roomId" element={<WaitingRoomPage />} />
        <Route path="/game-room/:roomId" element={<GameRoom />} />
        <Route path="/my-quizz" element={<MyQuizz />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/create-quiz"
          element={
            <RequireAuth>
              <CreateQuiz />
            </RequireAuth>
          }
        />
        <Route
          path="/my-quizzes"
          element={
            <RequireAuth>
              <MyQuizzes />
            </RequireAuth>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/users"
          element={
            <RequireAdmin>
              <UserManagement />
            </RequireAdmin>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
