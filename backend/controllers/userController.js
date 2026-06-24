import User from '../models/User.js';

// @desc    Get user profile data including groceries
// @route   GET /api/user/me
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add kitchen grocery item
// @route   POST /api/user/groceries
// @access  Private
export const addGroceryItem = async (req, res) => {
  try {
    const { item } = req.body;
    if (!item) return res.status(400).json({ message: 'Item is required' });

    const user = await User.findById(req.user._id);
    if (!user.kitchenGroceries.includes(item)) {
      user.kitchenGroceries.push(item);
      await user.save();
    }

    res.status(200).json(user.kitchenGroceries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove kitchen grocery item
// @route   DELETE /api/user/groceries/:item
// @access  Private
export const removeGroceryItem = async (req, res) => {
  try {
    const itemToRemove = req.params.item;
    const user = await User.findById(req.user._id);
    
    user.kitchenGroceries = user.kitchenGroceries.filter(item => item !== itemToRemove);
    await user.save();

    res.status(200).json(user.kitchenGroceries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
