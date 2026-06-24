import api from './api';

export const cookService = {
  getCooks: async () => {
    try {
      const response = await api.get('/cooks');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  hireCook: async (cookId, date) => {
    try {
      const response = await api.post('/cooks/hire', { cookId, date });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
