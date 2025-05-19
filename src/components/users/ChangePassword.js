// src/components/users/ChangePassword.js
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Grid,
  Box
} from '@mui/material';
import { Lock } from '@mui/icons-material';
import LoadingOverlay from '../common/LoadingOverlay';
import ErrorAlert from '../common/ErrorAlert';
import { changePassword } from '../../services/api';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (event) => {
    setPasswords({ ...passwords, [field]: event.target.value });
    setError(null);
    setSuccess(false);
  };

  const validatePasswords = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('Mật khẩu mới không khớp');
      return false;
    }
    if (passwords.newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validatePasswords()) return;

    try {
      setLoading(true);
      await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      setSuccess(true);
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể đổi mật khẩu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <LoadingOverlay open={loading} />
      <CardHeader title="Đổi mật khẩu" />
      <CardContent>
        {error && (
          <ErrorAlert
            severity="error"
            message={error}
            onRetry={() => setError(null)}
          />
        )}
        {success && (
          <ErrorAlert
            severity="success"
            message="Đổi mật khẩu thành công!"
          />
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu hiện tại"
                value={passwords.currentPassword}
                onChange={handleChange('currentPassword')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu mới"
                value={passwords.newPassword}
                onChange={handleChange('newPassword')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Xác nhận mật khẩu mới"
                value={passwords.confirmPassword}
                onChange={handleChange('confirmPassword')}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Lock />}
            >
              Đổi mật khẩu
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;