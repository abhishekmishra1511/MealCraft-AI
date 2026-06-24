import express from 'express';
import { generateRecipe, saveRecipe, getRecipeHistory, deleteRecipe } from '../controllers/recipeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public/Private Generation
// Optionally use 'protect' middleware here if you only want logged-in users to generate recipes.
// Since SRS says guests can generate but not save, we might want a custom middleware that sets req.user if token exists but doesn't block if missing.
// For now, let's allow anyone, but if they pass a token, we handle it in controller (or a soft-protect middleware).
const softProtect = async (req, res, next) => {
  import('jsonwebtoken').then(async (jwt) => {
    import('../models/User.js').then(async ({ default: User }) => {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
          token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
          req.user = await User.findById(decoded.id).select('-password');
        } catch (error) {
          // just ignore
        }
      }
      next();
    });
  });
};

router.post('/generate', softProtect, generateRecipe);

// Protected Routes
router.post('/save', protect, saveRecipe);
router.get('/history', protect, getRecipeHistory);
router.delete('/:id', protect, deleteRecipe);

export default router;
