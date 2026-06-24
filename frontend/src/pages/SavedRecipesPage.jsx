import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeService } from '../services/recipeService';
import { HiOutlineBookmark, HiOutlineEmojiSad, HiOutlineInbox, HiOutlineClock } from 'react-icons/hi';
import toast from 'react-hot-toast';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import Button from '../components/Button';

const SavedRecipesPage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Search & Filter state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [mealType, setMealType] = useState('');
  const [dietType, setDietType] = useState('');

  // Selected recipe detail modal state
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchSavedRecipes = async () => {
    try {
      setLoading(true);
      setError(false);
      const result = await recipeService.getRecipeHistory();
      setRecipes(result.recipes || []);
    } catch (err) {
      console.error('Failed to load saved recipes:', err);
      setError(true);
      toast.error('Failed to load saved recipes. Displaying mock backups.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const handleDeleteRecipe = async (id) => {
    try {
      const result = await recipeService.deleteRecipe(id);
      if (result.success) {
        setRecipes((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setCuisine('');
    setMealType('');
    setDietType('');
    toast.success('Search and filters reset');
  };

  // Filter recipes locally
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCuisine = !cuisine || recipe.cuisine.toLowerCase() === cuisine.toLowerCase();
    const matchesMeal = !mealType || recipe.mealType.toLowerCase() === mealType.toLowerCase();
    const matchesDiet = !dietType || recipe.dietType.toLowerCase() === dietType.toLowerCase();

    return matchesSearch && matchesCuisine && matchesMeal && matchesDiet;
  });

  if (loading) {
    return (
      <div className="min-h-[75vh] bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader message="Fetching your favorite saved recipes..." />
      </div>
    );
  }

  if (error && recipes.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col justify-center items-center">
        <EmptyState
          icon={HiOutlineEmojiSad}
          title="Connection Error"
          description="We had trouble retrieving recipes from the server. Check your internet connection or use mock settings."
          actionText="Try Reloading"
          onActionClick={fetchSavedRecipes}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        
        {/* Page title */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            Saved Recipes
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
            Browse and filter through your curated list of personalized favorites. Cook details or delete items at your discretion.
          </p>
        </div>

        {/* Filter panel & main search grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: active filters */}
          <div className="lg:col-span-4">
            <FilterPanel
              selectedCuisine={cuisine}
              onChangeCuisine={setCuisine}
              selectedMealType={mealType}
              onChangeMealType={setMealType}
              selectedDietType={dietType}
              onChangeDietType={setDietType}
              onReset={handleResetFilters}
            />
          </div>

          {/* Right panel: Search Bar & Recipe Grid */}
          <div className="lg:col-span-8 space-y-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search by title or ingredient (e.g. spinach)..."
            />

            {filteredRecipes.length === 0 ? (
              <EmptyState
                icon={HiOutlineInbox}
                title={recipes.length === 0 ? "Your favorites list is empty" : "No matching recipes"}
                description={
                  recipes.length === 0
                    ? "You haven't saved any recipes yet. Generate some custom dishes with our AI generator!"
                    : "No recipes match your current search terms or category filters. Try resetting parameters."
                }
                actionText={recipes.length === 0 ? "Go to Generator" : "Reset Filters"}
                onActionClick={
                  recipes.length === 0
                    ? () => navigate('/recipe-generator')
                    : handleResetFilters
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onDelete={handleDeleteRecipe}
                    onView={handleViewRecipe}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* DETAILED VIEW MODAL */}
      {selectedRecipe && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={selectedRecipe.title}
          size="lg"
        >
          <div className="space-y-6">
            
            {/* Meta tags and timings */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400">
                {selectedRecipe.cuisine}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {selectedRecipe.mealType}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-purple-50 text-purple-705 dark:bg-purple-950/20 dark:text-purple-400">
                {selectedRecipe.dietType}
              </span>
              {selectedRecipe.createdAt && (
                <span className="ml-auto text-xs text-slate-400 self-center">
                  Saved on {new Date(selectedRecipe.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* Nutrition Facts block */}
            <div className="bg-slate-50 dark:bg-slate-955 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Nutrition Information</h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Calories</p>
                  <p className="text-base font-extrabold text-teal-600 dark:text-teal-400">{selectedRecipe.nutrition?.calories || selectedRecipe.calories || '320 kcal'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Protein</p>
                  <p className="text-base font-extrabold text-slate-700 dark:text-slate-300">{selectedRecipe.nutrition?.protein || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Carbs</p>
                  <p className="text-base font-extrabold text-slate-700 dark:text-slate-300">{selectedRecipe.nutrition?.carbs || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Fat</p>
                  <p className="text-base font-extrabold text-slate-700 dark:text-slate-300">{selectedRecipe.nutrition?.fat || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Ingredients block */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-slate-805 dark:text-slate-100">Ingredients</h4>
              <ul className="space-y-2">
                {selectedRecipe.ingredients?.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions steps block */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-105">Cooking Steps</h4>
              <ol className="space-y-4">
                {selectedRecipe.instructions?.map((step, idx) => (
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

            {/* Delete shortcut inside modal */}
            <div className="pt-4 border-t border-slate-205 dark:border-slate-800 flex justify-between">
              <span className="text-xs text-slate-400 self-center">
                Preparation time: {selectedRecipe.totalTime || 30} mins
              </span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  handleDeleteRecipe(selectedRecipe.id);
                  setIsDetailOpen(false);
                }}
              >
                Delete Recipe
              </Button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};

export default SavedRecipesPage;
