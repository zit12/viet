import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (accessToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const userRole = parsedUser.role;

        if (userRole === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(formData);
      const { accessToken, refreshToken, user } = response.data;

      // Lưu token và user vào localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user_ID",user.user_id );
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", JSON.stringify(user.role));

      // Gửi sự kiện để cập nhật header hoặc các component khác nếu cần
      window.dispatchEvent(new Event("userStateChange"));

      // Điều hướng theo vai trò người dùng
      const role = user.role;
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
            <Typography variant="h4" gutterBottom>
              Welcome to NQuiz
            </Typography>
            <Typography variant="body1" paragraph>
              NQuiz is a comprehensive quiz management system designed to help
              educators create, manage, and administer quizzes efficiently.
            </Typography>
            <Typography variant="h6" gutterBottom>
              With NQuiz, you can:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1">
                Create and manage multiple quizzes
              </Typography>
              <Typography component="li" variant="body1">
                Track student progress and performance
              </Typography>
              <Typography component="li" variant="body1">
                Generate detailed reports and analytics
              </Typography>
              <Typography component="li" variant="body1">
                Share quizzes with your students
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?
                </Typography>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  sx={{ mt: 1 }}
                >
                  Create an account
                </Button>
                <Box sx={{ mt: 2 }}>
                  <Button
                    component={Link}
                    to="/forgot-password"
                    variant="text"
                    color="primary"
                  >
                    Forgot Password?
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Copyright NQuiz © 2025
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
