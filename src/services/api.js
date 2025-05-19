// src/services/api.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://cap2-nquiz-fe.onrender.com";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Only clear localStorage and redirect if we're not already on the login page
//       if (!window.location.pathname.includes("/login")) {
//         console.error("Authentication error: Token expired or invalid");
//         localStorage.clear();
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// Auth endpoints
export const login = (credentials) => api.post("/user/login", credentials);
export const register = (userData) => api.post("/user/register", userData);
export const forgotPassword = (email) =>
  api.post("/user/forgot-password", { email });
export const verifyOTP = (email, otp) =>
  api.post("/user/verify-otp", { email, otp });
export const resetPassword = (email, otp, newPassword) =>
  api.post("/user/reset-password", { email, otp, newPassword });
export const checkUsernameAvailability = (username) =>
  api.get(`/user/check-username/${username}`);

// User endpoints
export const getUsers = (params) => api.get("/user/admin/all", { params });
export const getUser = () => api.get("/user/profile");
export const updateProfile = (userData) => api.put("/user/profile", userData);
export const searchUserByUserName = (username, userData) =>
  api.get(`/user/admin/search/${username}`, userData);
export const createUser = (userData) => api.post("/user/admin/add", userData);
export const updateUser = (user_id, userData) =>
  api.put(`/user/admin/update/${user_id}`, userData);
export const deleteUser = (user_id) =>
  api.delete(`/user/admin/delete/${user_id}`);
export const changePassword = (passwords) =>
  api.post("/user/change-password", passwords);
export const uploadAvatar = (formData) =>
  api.post("/user/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Dashboard endpoints
export const getDashboardStats = () => api.get("/dashboard/stats");
export const getDashboardPerformance = () => api.get("/dashboard/performance");
export const getDashboardActivities = () => api.get("/dashboard/activities");

// Quiz endpoints
export const getQuizzes = (params) => api.get("/quizzes", { params });
export const getQuiz = (id) => api.get(`/quizzes/${id}`);
export const createQuiz = (quizData) => api.post("/quizzes", quizData);
export const updateQuiz = (id, quizData) => api.put(`/quizzes/${id}`, quizData);
export const deleteQuiz = (id) => api.delete(`/quizzes/${id}`);

//home page
export const getHomePageQuizzes = () => api.get("/home-page/all");
export const getHomePageQuizzesRadom = () => api.get("/home-page/random");
export const getHomePagePopularQuizzes = () => api.get("/home-page/popular");
export const getRecentlyPlayedQuizzes = () => api.get("/home-page/recently-played");


export const playQuiz = (quizId) => api.post(`/question/${quizId}/play`);

export const getQuizzesByUser = (userId) => api.get(`/home-page/user/${userId}`);


export default api;
