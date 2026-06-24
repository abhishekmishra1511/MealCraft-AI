import React from 'react';

const SkeletonLoader = ({ type = 'recipe-card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'profile':
        return (
          <div className="animate-pulse flex flex-col items-center p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl gap-6">
            <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <div className="w-1/2 h-5 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            <div className="w-1/3 h-4 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            <div className="w-full space-y-3 mt-4">
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
              <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
            </div>
            <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
          </div>
        );
      case 'recipe-card':
      default:
        return (
          <div className="animate-pulse flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm h-full">
            <div className="h-48 bg-slate-200 dark:bg-slate-800 w-full relative"></div>
            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="w-16 h-5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                  <div className="w-16 h-5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                </div>
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2"></div>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-full"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-5/6"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="w-24 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="w-full">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
