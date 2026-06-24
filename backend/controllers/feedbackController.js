import Feedback from '../models/Feedback.js';

// @desc    Submit user feedback
// @route   POST /api/feedback/submit
// @access  Private
export const submitFeedback = async (req, res) => {
  try {
    const { rating, message, isPublic } = req.body;

    if (!rating || !message) {
      return res.status(400).json({ message: 'Rating and message are required' });
    }

    const feedback = await Feedback.create({
      userId: req.user._id,
      rating,
      message,
      isPublic: isPublic !== undefined ? isPublic : true,
    });

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
};

// @desc    Get public testimonials (5-star ratings)
// @route   GET /api/feedback/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Feedback.find({ isPublic: true, rating: 5 })
      .populate('userId', 'name')
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
  }
};
