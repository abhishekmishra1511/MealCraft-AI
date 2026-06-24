import express from 'express';
import { upgradeSubscription } from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/upgrade', protect, upgradeSubscription);

export default router;
