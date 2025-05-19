// src/components/layout/Sidebar.js
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider
} from '@mui/material';
import {
  Dashboard,
  People,
  Quiz,
  Category,
  Settings,
  ExitToApp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Quản lý User', icon: <People />, path: '/dashboard/users', role: 'admin' },
    { text: 'Quản lý Quiz', icon: <Quiz />, path: '/dashboard/quizzes' },
    { text: 'Danh mục', icon: <Category />, path: '/dashboard/categories', role: 'admin' },
    { text: 'Cài đặt', icon: <Settings />, path: '/dashboard/settings' }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      sx={{
        width: isOpen ? 240 : 70,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? 240 : 70,
          boxSizing: 'border-box',
          backgroundColor: '#1a237e',
          color: 'white'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap>
          NQUIZ Admin
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          (!item.role || item.role === userRole) && (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              {isOpen && <ListItemText primary={item.text} />}
            </ListItem>
          )
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <ExitToApp />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Đăng xuất" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;