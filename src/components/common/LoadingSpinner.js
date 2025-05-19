// src/components/common/LoadingSpinner.js
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingSpinner = ({ message = 'Đang tải...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;