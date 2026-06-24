import User from '../models/User.js';

// @desc    Upgrade subscription plan
// @route   POST /api/subscription/upgrade
// @access  Private
export const upgradeSubscription = async (req, res) => {
  try {
    const { plan } = req.body; // 'pro-monthly' or 'pro-annual'

    if (!['pro-monthly', 'pro-annual'].includes(plan)) {
      return res.status(400).json({ message: 'Invalid subscription plan' });
    }

    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.subscriptionPlan = plan;
    await user.save();

    res.status(200).json({
      message: `Successfully upgraded to ${plan}`,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error upgrading subscription', error: error.message });
  }
};
