import React from 'react';
import { HiOutlineClock, HiOutlineBookmark, HiBookmark, HiOutlineTrash, HiRefresh, HiOutlineChevronRight } from 'react-icons/hi';
import { GiBarbedSun } from 'react-icons/gi'; // Nutrition icon representer
import Button from './Button';

const RecipeCard = ({
  recipe,
  isSaved = false,
  onSave,
  onDelete,
  onView,
  onRegenerate,
  className = ''
}) => {
  const {
    title,
    cuisine,
    mealType,
    dietType,
    cookTime,
    prepTime,
    totalTime,
    calories,
    nutrition = {},
    ingredients = [],
  } = recipe;

  // Visual highlights for diets
  const dietBadgeColors = {
    'Vegetarian': 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400',
    'Vegan': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400',
    'Keto': 'bg-purple-50 text-purple-700 dark:bg-purple-950/20 dark:text-purple-400',
    'Gluten-Free': 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400',
    'High Protein': 'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400',
  };

  const getDietBadge = (diet) => {
    return dietBadgeColors[diet] || 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
  };

  return (
    <div className={`group flex flex-col zero-card rounded-[2rem] overflow-hidden h-full ${className}`}>
      {/* Visual Header Banner */}
      <div className="relative h-28 bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-emerald-500/10 dark:from-slate-900/80 dark:to-slate-950/50 p-6 flex flex-col justify-end">
        <div className="absolute top-4 right-4 flex gap-2">
          {onRegenerate && (
            <button
              onClick={() => onRegenerate(recipe)}
              title="Regenerate Recipe"
              className="p-2 rounded-xl bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-700/50 hover:scale-105 transition-all"
            >
              <HiRefresh className="text-lg" />
            </button>
          )}
          
          {onSave && (
            <button
              onClick={() => onSave(recipe)}
              title={isSaved ? "Saved" : "Save Recipe"}
              className={`p-2 rounded-xl shadow-sm border transition-all hover:scale-105 ${
                isSaved
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-700/50'
              }`}
            >
              {isSaved ? <HiBookmark className="text-lg" /> : <HiOutlineBookmark className="text-lg" />}
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(recipe.id)}
              title="Delete Saved Recipe"
              className="p-2 rounded-xl bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 text-red-600 hover:text-red-700 shadow-sm border border-slate-100 dark:border-slate-700/50 hover:scale-105 transition-all"
            >
              <HiOutlineTrash className="text-lg" />
            </button>
          )}
        </div>

        {/* Category Badge Indicators */}
        <div className="flex flex-wrap gap-1.5 items-center mt-2">
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400">
            {cuisine}
          </span>
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {mealType}
          </span>
        </div>
      </div>

      {/* Main Recipe Info Card */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Title and Diet Badge */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {title}
            </h4>
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full shrink-0 ${getDietBadge(dietType)}`}>
              {dietType}
            </span>
          </div>

          {/* Time & Calories indicators */}
          <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4 bg-slate-50/50 dark:bg-slate-900/50 p-2.5 rounded-2xl">
            <div className="flex items-center gap-1.5">
              <HiOutlineClock className="text-teal-600 dark:text-teal-400" />
              <span>{totalTime || (prepTime + cookTime) || 30} mins</span>
            </div>
            <div className="w-px bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex items-center gap-1.5">
              <span className="text-teal-600 dark:text-teal-400 font-medium">🔥</span>
              <span>{calories || nutrition.calories || '320'} kcal</span>
            </div>
          </div>

          {/* Ingredients Preview */}
          <div className="mb-4">
            <h5 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Key Ingredients
            </h5>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1.5">
              {ingredients.slice(0, 3).map((ing, idx) => (
                <li key={idx} className="line-clamp-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>{ing}</span>
                </li>
              ))}
              {ingredients.length > 3 && (
                <li className="text-xs text-slate-400 dark:text-slate-500 pl-3.5">
                  + {ingredients.length - 3} more ingredients
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Nutritional Micro Summary */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-50/50 dark:bg-slate-900/30 p-2 rounded-xl mb-4">
            <div>
              <p className="text-slate-400 dark:text-slate-500">Protein</p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">{nutrition.protein || '12g'}</p>
            </div>
            <div>
              <p className="text-slate-400 dark:text-slate-500">Carbs</p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">{nutrition.carbs || '30g'}</p>
            </div>
            <div>
              <p className="text-slate-400 dark:text-slate-500">Fat</p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">{nutrition.fat || '14g'}</p>
            </div>
          </div>

          {onView && (
            <Button
              onClick={() => onView(recipe)}
              variant="outline"
              size="sm"
              className="w-full justify-between"
            >
              <span>View Cooking Instructions</span>
              <HiOutlineChevronRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
