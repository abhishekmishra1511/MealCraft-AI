import React from 'react';
import { HiOutlineSearch, HiX } from 'react-icons/hi';

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search recipes...',
  className = '',
  onClear
}) => {
  return (
    <div className={`relative w-full rounded-2xl shadow-sm ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
        <HiOutlineSearch className="text-xl" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-12 pr-10 py-3.5 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950/40 border border-slate-205 dark:border-slate-850 rounded-2xl placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-teal-505 focus:border-teal-500 transition-all"
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <HiX className="text-lg" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
