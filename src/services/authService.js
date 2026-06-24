import api from './api';
import toast from 'react-hot-toast';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return { success: true, ...response.data };
    } catch (error) {
      throw error;
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return { success: true, ...response.data };
    } catch (error) {
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/user/me');
      return { user: response.data };
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      // Assuming a PUT /api/user/me endpoint exists or you can add one later
      const response = await api.put('/user/me', profileData);
      toast.success('Profile updated successfully!');
      return { user: response.data };
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/user/change-password', { currentPassword, newPassword });
      toast.success('Password changed successfully!');
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
};
