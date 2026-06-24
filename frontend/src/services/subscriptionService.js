import api from './api';

export const subscriptionService = {
  upgrade: async (plan) => {
    try {
      const response = await api.post('/subscription/upgrade', { plan });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
