import React from 'react';
import Button from './Button';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  onActionClick,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 md:p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/10 ${className}`}>
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 shadow-sm">
          <Icon className="text-3xl" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6 text-sm md:text-base leading-relaxed">
        {description}
      </p>
      {actionText && onActionClick && (
        <Button onClick={onActionClick} variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
