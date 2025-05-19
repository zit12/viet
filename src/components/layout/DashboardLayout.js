// src/components/layout/DashboardLayout.js
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isOpen={isSidebarOpen} />
      <Box sx={{ flexGrow: 1 }}>
        <TopNav onMenuClick={toggleSidebar} />
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;