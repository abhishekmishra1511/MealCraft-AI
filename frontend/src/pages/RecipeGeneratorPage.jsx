import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { recipeService } from '../services/recipeService';
import { useAuth } from '../context/AuthContext';
import { HiOutlineSparkles, HiOutlineBackspace, HiOutlineBookmark, HiCheckCircle, HiOutlineClock } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Button from '../components/Button';
import Loader from '../components/Loader';
import SkeletonLoader from '../components/SkeletonLoader';
import RecipeCard from '../components/RecipeCard';
import Modal from '../components/Modal';

const RecipeGeneratorPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('Any');
  const [mealType, setMealType] = useState('Any');
  const [dietType, setDietType] = useState('Any');
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  
  // Modal toggle for detailed instructions view
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const cuisines = [
    { value: 'Any', label: 'Any Cuisine 🌎' },
    { value: 'Indian', label: 'Indian 🌶️' },
    { value: 'Italian', label: 'Italian 🍕' },
    { value: 'Chinese', label: 'Chinese 🥢' },
    { value: 'Mexican', label: 'Mexican 🌮' },
    { value: 'American', label: 'American 🍔' }
  ];

  const mealTypes = [
    { value: 'Any', label: 'Any Meal Type 🕒' },
    { value: 'Breakfast', label: 'Breakfast 🍳' },
    { value: 'Lunch', label: 'Lunch 🍱' },
    { value: 'Dinner', label: 'Dinner 🍽️' },
    { value: 'Snack', label: 'Snack 🍿' },
    { value: 'Dessert', label: 'Dessert 🍰' }
  ];

  const dietTypes = [
    { value: 'Any', label: 'Any Diet Type 🥗' },
    { value: 'Vegetarian', label: 'Vegetarian 🥦' },
    { value: 'Vegan', label: 'Vegan 🌱' },
    { value: 'Keto', label: 'Keto 🥑' },
    { value: 'Gluten-Free', label: 'Gluten-Free 🌾' },
    { value: 'High Protein', label: 'High Protein 🥚' }
  ];

  // Intercept search prompt passed from Landing Page hero search input
  useEffect(() => {
    if (location.state?.initialPrompt) {
      const promptText = location.state.initialPrompt;
      setIngredients(promptText);

      // Auto-trigger recipe generation
      const triggerAutoGenerate = async (prompt) => {
        setLoading(true);
        setGeneratedRecipe(null);
        setLoadingStep('Crafting custom recipe from your search prompt...');
        try {
          const result = await recipeService.generateRecipe({
            ingredients: prompt,
            cuisine: 'Any',
            mealType: 'Any',
            dietType: 'Any'
          });
          if (result && result.recipe) {
            setGeneratedRecipe(result.recipe);
          } else {
            toast.error('Auto generation failed.');
          }
        } catch (err) {
          console.error(err);
          toast.error('Recipe auto-generation failed.');
        } finally {
          setLoading(false);
        }
      };

      triggerAutoGenerate(promptText);
      // Clear react router history state so refreshes don't re-trigger it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleReset = () => {
    setIngredients('');
    setCuisine('Any');
    setMealType('Any');
    setDietType('Any');
    setGeneratedRecipe(null);
    toast.success('Form filters reset');
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setGeneratedRecipe(null);

    // Dynamic messaging simulation to excite the user
    const steps = [
      'Deconstructing ingredient inputs...',
      'Mapping culinary flavor profiles...',
      'Structuring macro nutritional stats...',
      'Drafting cooking steps in AI chef engine...'
    ];

    let stepIdx = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setLoadingStep(steps[stepIdx]);
      }
    }, 500);

    try {
      const result = await recipeService.generateRecipe({
        ingredients,
        cuisine,
        mealType,
        dietType
      });
      if (result && result.recipe) {
        setGeneratedRecipe(result.recipe);
      } else {
        toast.error('Could not generate recipe. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Recipe generation failed. Safe fallback data used.');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const handleSaveRecipe = async (recipe) => {
    try {
      const result = await recipeService.saveRecipe(recipe);
      if (result.success) {
        setSavedRecipeIds((prev) => [...prev, recipe.id]);
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const isRecipeAlreadySaved = (id) => {
    return savedRecipeIds.includes(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        
        {/* Header Title */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            AI Recipe Generator
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
            Input whatever ingredients you have in your kitchen, select your custom tags, and watch our AI formulate clean cooking guides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. INPUT FORM */}
          <div className="zero-card p-6 rounded-[2.5rem] lg:col-span-5 space-y-6">
            <form onSubmit={handleGenerate} className="space-y-5">
              <Textarea
                label="Ingredients list (comma-separated)"
                id="ingredients"
                placeholder="e.g. paneer, spinach, onions, tomatoes, garlic"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
                rows={5}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                <Select
                  label="Cuisine Preference"
                  id="cuisine"
                  options={cuisines}
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                />

                <Select
                  label="Meal Interval"
                  id="mealType"
                  options={mealTypes}
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                />

                <Select
                  label="Diet Category"
                  id="dietType"
                  options={dietTypes}
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  icon={HiOutlineBackspace}
                  className="w-full py-3"
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  icon={HiOutlineSparkles}
                  className="w-full py-3 shadow-md shadow-teal-500/10"
                >
                  Generate
                </Button>
              </div>
            </form>
          </div>

          {/* 2. LOADING STATE AND RESULTS DISPLAY */}
          <div className="lg:col-span-7 h-full">
            {loading && (
              <div className="zero-card p-6 rounded-[2.5rem] space-y-6 h-full flex flex-col justify-center">
                <Loader message={loadingStep} />
                <div className="grid grid-cols-1 gap-6 max-w-md mx-auto w-full">
                  <SkeletonLoader type="recipe-card" count={1} />
                </div>
              </div>
            )}

            {!loading && !generatedRecipe && (
              <div className="h-full border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/10 min-h-[350px]">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 text-3xl">
                  👩‍🍳
                </div>
                <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300">
                  Ready to craft your recipe?
                </h4>
                <p className="text-slate-400 dark:text-slate-500 text-sm max-w-sm mt-1.5 leading-relaxed">
                  Enter your ingredients on the left panel, configure filters, and tap Generate to construct your food card.
                </p>
              </div>
            )}

            {!loading && generatedRecipe && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 animate-pulse">
                  <HiCheckCircle className="text-xl" />
                  <span>Success! AI Recipe formulated.</span>
                </div>
                
                {/* Result Recipe Card */}
                <RecipeCard
                  recipe={generatedRecipe}
                  isSaved={isRecipeAlreadySaved(generatedRecipe.id)}
                  onSave={handleSaveRecipe}
                  onView={() => setIsDetailOpen(true)}
                  onRegenerate={handleGenerate}
                />
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 3. RECIPE DETAILS MODAL */}
      {generatedRecipe && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={generatedRecipe.title}
          size="lg"
        >
          <div className="space-y-6">
            
            {/* Meta badges and summary */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400">
                {generatedRecipe.cuisine}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {generatedRecipe.mealType}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/20 dark:text-purple-400">
                {generatedRecipe.dietType}
              </span>
              <div className="ml-auto flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                <HiOutlineClock className="text-lg" />
                <span>Prep: {generatedRecipe.prepTime}m | Cook: {generatedRecipe.cookTime}m</span>
              </div>
            </div>

            {/* Nutrition facts Grid */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Nutrition Information</h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Calories</p>
                  <p className="text-base font-extrabold text-teal-600 dark:text-teal-400">{generatedRecipe.nutrition?.calories || generatedRecipe.calories || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Protein</p>
                  <p className="text-base font-extrabold text-slate-700 dark:text-slate-300">{generatedRecipe.nutrition?.protein || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Carbs</p>
                  <p className="text-base font-extrabold text-slate-700 dark:text-slate-300">{generatedRecipe.nutrition?.carbs || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Fat</p>
                  <p className="text-base font-extrabold text-slate-700 dark:text-slate-300">{generatedRecipe.nutrition?.fat || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Ingredients block */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">Ingredients</h4>
              <ul className="space-y-2">
                {generatedRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps block */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">Cooking Steps</h4>
              <ol className="space-y-4">
                {generatedRecipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 text-sm font-bold shrink-0 border border-teal-100 dark:border-teal-900/30">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Save toggle inside modal */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <Button
                variant={isRecipeAlreadySaved(generatedRecipe.id) ? "secondary" : "primary"}
                onClick={() => handleSaveRecipe(generatedRecipe)}
                disabled={isRecipeAlreadySaved(generatedRecipe.id)}
                icon={isRecipeAlreadySaved(generatedRecipe.id) ? HiCheckCircle : HiOutlineBookmark}
              >
                {isRecipeAlreadySaved(generatedRecipe.id) ? "Saved to Favorites" : "Save Recipe"}
              </Button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};

export default RecipeGeneratorPage;
