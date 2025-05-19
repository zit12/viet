import api from "./api";

export const userService = {
  // Get all users with pagination and search
  getUsers: async (page, limit, search = "") => {
    const response = await api.get("/user/admin/all", {
      params: { page, limit, search },
    });
    return response.data;
  },

  // Search users by username (partial match)
  searchUserByUserName: async (username) => {
    const response = await api.get(`/user/admin/search/${username}`);
    return response.data;
  },

  // Create a new user
  createUser: async (userData) => {
    const response = await api.post("/user/admin/add", userData);
    return response.data;
  },

  // Update a user
  updateUser: async (user_id, userData) => {
    const response = await api.put(`/user/admin/update/${user_id}`, userData);
    return response.data;
  },

  // Delete a user
  deleteUser: async (user_id) => {
    const response = await api.delete(`/user/admin/delete/${user_id}`);
    return response.data;
  },
};
