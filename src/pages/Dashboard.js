import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  Assessment,
  People,
  School,
  Timeline,
  ArrowUpward,
  ArrowDownward,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../services/api";
import { userService } from "../services/userService";
import UserFormDialog from "../components/admin/UserFormDialog";
import DeleteConfirmDialog from "../components/common/DeleteConfirmDialog";
import HeaderDashboard from "./admin/HeaderDashboard";
import UserManagement from "../pages/admin/UserManagement";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalQuizzes: 0,
    completionRate: 0,
    studentGrowth: 0,
    quizGrowth: 0,
    userGrowth: 0,
    completionGrowth: 0,
  });
  const [performanceData, setPerformanceData] = useState([]);

  // User management state
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/home");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Check if we have a valid token
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const [statsRes, performanceRes] = await Promise.all([
          api.get("/user/admin/all"),
          api.get("/api/dashboard/performance"),
        ]);

        setStats(statsRes.data);
        setPerformanceData(performanceRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Don't redirect to login here, just show an error message
        if (error.response?.status === 401) {
          // Handle unauthorized error without redirecting
          console.error("Unauthorized access. Please check your permissions.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getUsers(page + 1, rowsPerPage);
        setUsers(response.data.users);
        setTotalUsers(response.data.total);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [page, rowsPerPage]);

  // Handle user form
  const handleOpenForm = (user = null) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (userData) => {
    try {
      // Check if we have a valid token
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      if (selectedUser) {
        await userService.updateUser(selectedUser.id, userData);
      } else {
        await userService.createUser(userData);
      }
      handleCloseForm();
      // Refresh users
      const response = await userService.getUsers(page + 1, rowsPerPage);
      setUsers(response.data.users);
      setTotalUsers(response.data.total);
    } catch (error) {
      console.error("Error handling user:", error);
      // Don't redirect to login here, just show an error message
      if (error.response?.status === 401) {
        // Handle unauthorized error without redirecting
        console.error("Unauthorized access. Please check your permissions.");
      }
    }
  };

  // Handle user deletion
  const handleDelete = async () => {
    try {
      await userService.deleteUser(selectedUser.id);
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      // Refresh users
      const response = await userService.getUsers(page + 1, rowsPerPage);
      setUsers(response.data.users);
      setTotalUsers(response.data.total);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return (
      <Box className="loading-overlay">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="main-content-dashboard">
      <HeaderDashboard />
      <Container maxWidth={false}>
        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <div className="stats-card">
              <div className="stats-icon primary">
                <School />
              </div>
              <Typography className="stats-label">Total Students</Typography>
              <Typography className="stats-value">
                {stats.totalStudents}
              </Typography>
              <div
                className={`stats-trend ${
                  stats.studentGrowth >= 0 ? "trend-up" : "trend-down"
                }`}
              >
                {stats.studentGrowth >= 0 ? <ArrowUpward /> : <ArrowDownward />}
                <span>{Math.abs(stats.studentGrowth)}% from last month</span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="stats-card">
              <div className="stats-icon success">
                <Assessment />
              </div>
              <Typography className="stats-label">Total Quizzes</Typography>
              <Typography className="stats-value">
                {stats.totalQuizzes}
              </Typography>
              <div
                className={`stats-trend ${
                  stats.quizGrowth >= 0 ? "trend-up" : "trend-down"
                }`}
              >
                {stats.quizGrowth >= 0 ? <ArrowUpward /> : <ArrowDownward />}
                <span>{Math.abs(stats.quizGrowth)}% from last month</span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="stats-card">
              <div className="stats-icon warning">
                <People />
              </div>
              <div
                className={`stats-trend ${
                  stats.userGrowth >= 0 ? "trend-up" : "trend-down"
                }`}
              >
                {stats.userGrowth >= 0 ? <ArrowUpward /> : <ArrowDownward />}
                <span>{Math.abs(stats.userGrowth)}% from last month</span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="stats-card">
              <div className="stats-icon danger">
                <Timeline />
              </div>
              <Typography className="stats-label">
                Quiz Completion Rate
              </Typography>
              <Typography className="stats-value">
                {stats.completionRate}%
              </Typography>
              <div
                className={`stats-trend ${
                  stats.completionGrowth >= 0 ? "trend-up" : "trend-down"
                }`}
              >
                {stats.completionGrowth >= 0 ? (
                  <ArrowUpward />
                ) : (
                  <ArrowDownward />
                )}
                <span>{Math.abs(stats.completionGrowth)}% from last month</span>
              </div>
            </div>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <div className="chart-container">
              <div className="chart-header">
                <Typography className="chart-title">
                  Quiz Performance
                </Typography>
                <div className="chart-controls">
                  <button className="chart-control-btn active">7 Days</button>
                  <button className="chart-control-btn">30 Days</button>
                  <button className="chart-control-btn">3 Months</button>
                </div>
              </div>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="quizzes"
                      stroke="#1976d2"
                      name="Total Quizzes"
                    />
                    <Line
                      type="monotone"
                      dataKey="completions"
                      stroke="#2e7d32"
                      name="Completions"
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#ed6c02"
                      name="Avg Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </div>
          </Grid>
        </Grid>

        {/* User Management Section */}
        <UserManagement />

        {/* User Form Dialog */}
        <UserFormDialog
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          user={selectedUser}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          title="Delete User"
          content="Are you sure you want to delete this user? This action cannot be undone."
        />
      </Container>
    </Box>
  );
};

export default Dashboard;
