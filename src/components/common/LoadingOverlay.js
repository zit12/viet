// src/components/common/LoadingOverlay.js
import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingOverlay = ({ open }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;