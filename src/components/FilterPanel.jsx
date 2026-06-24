import React from 'react';
import { HiOutlineAdjustments, HiX } from 'react-icons/hi';
import Button from './Button';

const FilterPanel = ({
  selectedCuisine,
  onChangeCuisine,
  selectedMealType,
  onChangeMealType,
  selectedDietType,
  onChangeDietType,
  onReset,
  className = ''
}) => {
  const cuisines = ['Any', 'Indian', 'Italian', 'Chinese', 'Mexican', 'American'];
  const mealTypes = ['Any', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
  const dietTypes = ['Any', 'Vegetarian', 'Vegan', 'Keto', 'Gluten-Free', 'High Protein'];

  const FilterGroup = ({ title, options, selectedValue, onChange }) => (
    <div className="space-y-2">
      <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        {title}
      </h5>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const isSelected = selectedValue === option || (option === 'Any' && !selectedValue);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option === 'Any' ? '' : option)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                isSelected
                  ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );

  const hasActiveFilters = selectedCuisine || selectedMealType || selectedDietType;

  return (
    <div className={`zero-card rounded-3xl p-5 space-y-5 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
          <HiOutlineAdjustments className="text-xl text-teal-600" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
          >
            <HiX />
            <span>Reset All</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        <FilterGroup
          title="Cuisine"
          options={cuisines}
          selectedValue={selectedCuisine}
          onChange={onChangeCuisine}
        />
        
        <FilterGroup
          title="Meal Type"
          options={mealTypes}
          selectedValue={selectedMealType}
          onChange={onChangeMealType}
        />

        <FilterGroup
          title="Diet Type"
          options={dietTypes}
          selectedValue={selectedDietType}
          onChange={onChangeDietType}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
