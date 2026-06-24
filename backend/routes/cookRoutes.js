import express from 'express';
import { getCooks, hireCook } from '../controllers/cookController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCooks);
router.post('/hire', protect, hireCook);

export default router;
