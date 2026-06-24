import React from 'react';

const Textarea = ({
  label,
  id,
  error,
  icon: Icon,
  className = '',
  required = false,
  rows = 4,
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-505">*</span>}
        </label>
      )}
      <div className="relative rounded-2xl">
        {Icon && (
          <div className="absolute top-3.5 left-4 flex items-start pointer-events-none text-slate-400 dark:text-slate-500">
            <Icon className="text-lg" />
          </div>
        )}
        <textarea
          id={id}
          required={required}
          rows={rows}
          className={`
            block w-full rounded-2xl border transition-all duration-300 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950/40
            ${Icon ? 'pl-11' : 'pl-4'}
            pr-4 py-3.5 text-sm placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-1
            ${
              error
                ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500'
                : 'border-slate-200 dark:border-slate-800/80 focus:ring-teal-500 focus:border-teal-550'
            }
            disabled:opacity-40 disabled:cursor-not-allowed
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs font-medium text-red-550 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default Textarea;
