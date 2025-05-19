import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { getUser, updateProfile } from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    avatar_url: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getUser();
      setProfile({
        username: response.data.username,
        email: response.data.email,
        avatar_url: response.data.avatar_url || "",
      });
    } catch (err) {
      console.error("Fetch profile error:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to fetch profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(profile);
      setProfile({
        username: response.data.username,
        email: response.data.email,
        avatar_url: response.data.avatar_url || "",
      });
      setMessage({ type: "success", text: "Profile updated successfully" });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update profile",
      });
    }
  };

  const handlePasswordResetRequest = () => {
    setMessage({
      type: "info",
      text: "Password reset link has been sent to your email",
    });
  };

  const handleDeleteAccountRequest = () => {
    setMessage({
      type: "info",
      text: "Account deletion link has been sent to your email",
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "#ffffff",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            src={profile.avatar_url}
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: "4px solid #1976d2",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#1976d2",
                color: "#fff",
              },
            }}
          >
            Change profile picture
          </Button>
        </Box>

        <Box component="form" onSubmit={handleProfileSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={profile.username}
            onChange={handleProfileChange}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "12px",
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            disabled
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "12px",
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: "25px",
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #1565c0 0%, #2196f3 100%)",
              },
            }}
          >
            Save
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant="text"
            color="primary"
            onClick={handlePasswordResetRequest}
            sx={{
              mb: 1,
              textTransform: "none",
              fontWeight: 500,
              "&:hover": { backgroundColor: "#e3f2fd" },
            }}
          >
            Send a password reset link to my email
          </Button>
          <Button
            fullWidth
            variant="text"
            color="error"
            onClick={handleDeleteAccountRequest}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              "&:hover": { backgroundColor: "#ffebee" },
            }}
          >
            Send a delete account link to my email
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
