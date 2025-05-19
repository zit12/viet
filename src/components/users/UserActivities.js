// src/components/users/UserActivities.js
import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
  Pagination
} from '@mui/material';
import api from '../../services/api';

const UserActivities = ({ userId }) => {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchActivities();
  }, [userId, page]);

  const fetchActivities = async () => {
    try {
      const response = await api.get(`/api/users/${userId}/activities?page=${page}`);
      setActivities(response.data.activities);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Lịch sử hoạt động
      </Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.activity_id}>
            <ListItemText
              primary={activity.description}
              secondary={new Date(activity.created_at).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Paper>
  );
};

export default UserActivities;