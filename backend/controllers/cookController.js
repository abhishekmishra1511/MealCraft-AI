import Cook from '../models/Cook.js';
import HireRequest from '../models/HireRequest.js';

// @desc    Get all available cooks
// @route   GET /api/cooks
// @access  Public
export const getCooks = async (req, res) => {
  try {
    const cooks = await Cook.find({});
    res.status(200).json(cooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cooks', error: error.message });
  }
};

// @desc    Hire a cook for a specific date
// @route   POST /api/cooks/hire
// @access  Private
export const hireCook = async (req, res) => {
  try {
    const { cookId, date } = req.body;

    if (!cookId || !date) {
      return res.status(400).json({ message: 'Cook ID and date are required' });
    }

    const cook = await Cook.findById(cookId);
    if (!cook) {
      return res.status(404).json({ message: 'Cook not found' });
    }

    const hireRequest = await HireRequest.create({
      userId: req.user._id,
      cookId: cook._id,
      date: new Date(date),
      status: 'pending'
    });

    res.status(201).json({ message: 'Hire request submitted successfully', hireRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting hire request', error: error.message });
  }
};
