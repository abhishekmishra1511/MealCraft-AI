import api from './api';
import { mockRecipes } from '../data/mockRecipes';
import toast from 'react-hot-toast';

// Helper to simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper for local storage persistence of saved recipes
const getLocalSavedRecipes = () => {
  const local = localStorage.getItem('recipe_app_saved_recipes');
  if (!local) {
    // Seed with two default mock recipes initially
    localStorage.setItem('recipe_app_saved_recipes', JSON.stringify([mockRecipes[0], mockRecipes[1]]));
    return [mockRecipes[0], mockRecipes[1]];
  }
  return JSON.parse(local);
};

const saveLocalSavedRecipes = (recipes) => {
  localStorage.setItem('recipe_app_saved_recipes', JSON.stringify(recipes));
};

export const recipeService = {
  generateRecipe: async (params) => {
    try {
      const response = await api.post('/recipes/generate', params);
      return response.data;
    } catch (error) {
      console.warn('Backend generator unavailable. Simulating AI generation locally.');
      await delay(2000); // Realistic AI generation lag

      const { ingredients = '', cuisine = 'Any', mealType = 'Any', dietType = 'Any' } = params;

      // If the user provided specific ingredients, skip the hardcoded mock recipes 
      // so we can dynamically generate a custom recipe based on their ingredients.
      if (!ingredients || ingredients.trim().length === 0) {
        // Filter local mock recipes to see if we have an exact match first
        const matches = mockRecipes.filter(r => {
          const cuisineMatch = cuisine === 'Any' || r.cuisine.toLowerCase() === cuisine.toLowerCase();
          const mealMatch = mealType === 'Any' || r.mealType.toLowerCase() === mealType.toLowerCase();
          const dietMatch = dietType === 'Any' || r.dietType.toLowerCase() === dietType.toLowerCase();
          return cuisineMatch && mealMatch && dietMatch;
        });

        if (matches.length > 0) {
          // Return a matching mock recipe
          const recipe = matches[Math.floor(Math.random() * matches.length)];
          toast.success(`Generated ${recipe.title} (Demo Mode)`);
          return { recipe };
        }
      }

      // If no mock recipes match, dynamically generate a custom recipe based on the user's input ingredients!
      const ingredientList = ingredients
        ? ingredients.split(',').map(i => i.trim()).filter(Boolean)
        : ['Fresh garden vegetables', 'Herb seasoning', 'Olive oil'];
      
      const capitalizedCuisine = cuisine !== 'Any' ? cuisine : 'Fusion';
      const capitalizedMeal = mealType !== 'Any' ? mealType : 'Main Course';
      const capitalizedDiet = dietType !== 'Any' ? dietType : 'Healthy';

      const generatedTitle = `Custom ${capitalizedDiet} ${capitalizedCuisine} ${capitalizedMeal}`;

      const generatedRecipe = {
        id: `gen-${Date.now()}`,
        title: generatedTitle,
        cuisine: capitalizedCuisine,
        mealType: capitalizedMeal,
        dietType: capitalizedDiet,
        prepTime: 12,
        cookTime: 18,
        totalTime: 30,
        servings: 2,
        difficulty: "Medium",
        calories: 340,
        nutrition: {
          calories: "340 kcal",
          protein: "14g",
          carbs: "28g",
          fat: "16g"
        },
        ingredients: [
          ...ingredientList.map((ing, idx) => `${idx + 1} cup of ${ing}`),
          "1 tbsp Cooking olive oil",
          "1 clove Garlic, crushed",
          "Seasonings (salt, pepper, mixed herbs) to taste"
        ],
        instructions: [
          `Prep the main ingredients: ${ingredientList.join(', ')}. Clean and chop as needed.`,
          "Heat the olive oil in a non-stick pan over medium heat. Sauté the crushed garlic for 30 seconds until aromatic.",
          `Gently fold in the core ingredients: ${ingredientList.join(', ')}. Sauté for 8-10 minutes.`,
          "Add seasonings and simmer on low heat for 5 minutes, covering the pan to lock in moisture and flavor.",
          "Check seasonings. Garnish with fresh herbs and serve warm as a fresh homemade plate."
        ],
        createdAt: new Date().toISOString()
      };

      toast.success('Custom recipe generated with AI mock! (Demo Mode)');
      return { recipe: generatedRecipe };
    }
  },

  saveRecipe: async (recipe) => {
    try {
      const response = await api.post('/recipes/save', { recipe });
      return response.data;
    } catch (error) {
      console.warn('Backend recipe saving unavailable. Saving to Local Storage.');
      await delay(500);

      const saved = getLocalSavedRecipes();
      
      // Check if already saved
      if (saved.some(r => r.id === recipe.id)) {
        toast.error('Recipe already saved!');
        return { success: false, recipe };
      }

      const updated = [
        { ...recipe, savedAt: new Date().toISOString() },
        ...saved
      ];
      saveLocalSavedRecipes(updated);
      toast.success('Recipe saved to favorites! (Local Storage)');
      return { success: true, recipes: updated };
    }
  },

  getRecipeHistory: async () => {
    try {
      const response = await api.get('/recipes/saved');
      return response.data;
    } catch (error) {
      console.warn('Backend saved recipes retrieval failed. Loading from Local Storage.');
      await delay(500);
      return {
        recipes: getLocalSavedRecipes()
      };
    }
  },

  deleteRecipe: async (recipeId) => {
    try {
      const response = await api.delete(`/recipes/saved/${recipeId}`);
      return response.data;
    } catch (error) {
      console.warn('Backend recipe deletion failed. Deleting from Local Storage.');
      await delay(500);

      const saved = getLocalSavedRecipes();
      const filtered = saved.filter(r => r.id !== recipeId);
      saveLocalSavedRecipes(filtered);
      toast.success('Recipe removed from favorites. (Local Storage)');
      return { success: true, recipes: filtered };
    }
  }
};
