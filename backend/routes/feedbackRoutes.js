import express from 'express';
import { submitFeedback, getTestimonials } from '../controllers/feedbackController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/submit', protect, submitFeedback);
router.get('/testimonials', getTestimonials);

export default router;
