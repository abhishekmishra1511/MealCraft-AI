import React from 'react';

const Loader = ({ fullPage = false, message = 'Loading delicious recipes...' }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-teal-100 dark:border-teal-900/30 opacity-75"></div>
        {/* Inner rotating gradient circle */}
        <div className="absolute inset-0 rounded-full border-4 border-t-teal-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        {/* Small floating bubble inside */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl animate-bounce">
          🍳
        </div>
      </div>
      {message && (
        <p className="text-slate-600 dark:text-slate-400 font-medium animate-pulse text-sm">
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 w-full">
      {spinner}
    </div>
  );
};

export default Loader;
