import express from 'express';
import { getUserProfile, addGroceryItem, removeGroceryItem } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getUserProfile);
router.post('/groceries', protect, addGroceryItem);
router.delete('/groceries/:item', protect, removeGroceryItem);

export default router;
