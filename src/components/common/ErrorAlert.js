import React from 'react';
import { Alert, Button, Box } from '@mui/material';
import { Refresh } from '@mui/icons-material';

const ErrorAlert = ({ severity, message, onRetry }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert
        severity={severity}
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              startIcon={<Refresh />}
            >
              Thử lại
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;