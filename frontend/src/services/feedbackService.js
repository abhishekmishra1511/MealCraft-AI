import api from './api';

export const feedbackService = {
  submitFeedback: async (rating, message, isPublic) => {
    try {
      const response = await api.post('/feedback/submit', { rating, message, isPublic });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTestimonials: async () => {
    try {
      const response = await api.get('/feedback/testimonials');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
