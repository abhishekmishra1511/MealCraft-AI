import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
import { generateRecipePrompt } from '../services/groqService.js';

// @desc    Generate recipe via AI
// @route   POST /api/recipes/generate
// @access  Public (or Private depending on requirements, let's keep it accessible if no token, but use user's groceries if token exists)
export const generateRecipe = async (req, res) => {
  try {
    const { ingredients, dietType, mealType, cuisine, useKitchenGroceries } = req.body;
    let kitchenGroceries = [];

    // If user is authenticated and wants to use kitchen groceries
    if (useKitchenGroceries && req.user) {
      const user = await User.findById(req.user._id);
      kitchenGroceries = user.kitchenGroceries || [];
    }

    const recipeData = await generateRecipePrompt(ingredients, dietType, cuisine, mealType, kitchenGroceries);

    res.status(200).json({ recipe: recipeData });
  } catch (error) {
    res.status(500).json({ message: 'Error generating recipe', error: error.message });
  }
};

// @desc    Save a recipe to user's history/favorites
// @route   POST /api/recipes/save
// @access  Private
export const saveRecipe = async (req, res) => {
  try {
    const payload = req.body.recipe ? req.body.recipe : req.body;
    const { title, ingredients, instructions, nutrition, cookingTime, prepTime, cookTime, totalTime, difficulty } = payload;

    const recipe = await Recipe.create({
      userId: req.user._id,
      title,
      ingredients,
      instructions,
      nutrition,
      cookingTime: cookingTime || (totalTime ? `${totalTime} minutes` : `${(prepTime || 0) + (cookTime || 0)} minutes`),
      difficulty,
    });

    // Add to user's favorites
    const user = await User.findById(req.user._id);
    user.favorites.push(recipe._id);
    await user.save();

    res.status(201).json({ message: 'Recipe saved successfully', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Error saving recipe', error: error.message });
  }
};

// @desc    Get user's recipe history/favorites
// @route   GET /api/recipes/history
// @access  Private
export const getRecipeHistory = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe history', error: error.message });
  }
};

// @desc    Delete saved recipe
// @route   DELETE /api/recipes/:id
// @access  Private
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await recipe.deleteOne();

    // Remove from user's favorites
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter((fav) => fav.toString() !== req.params.id);
    await user.save();

    res.status(200).json({ message: 'Recipe removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error: error.message });
  }
};
