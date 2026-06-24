import React from 'react';

const Select = ({
  label,
  id,
  options = [],
  error,
  icon: Icon,
  className = '',
  required = false,
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
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Icon className="text-lg" />
          </div>
        )}
        <select
          id={id}
          required={required}
          className={`
            block w-full rounded-2xl border transition-all duration-300 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950/40
            ${Icon ? 'pl-11' : 'pl-4'}
            pr-10 py-3 text-sm focus:outline-none focus:ring-1
            ${
              error
                ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500'
                : 'border-slate-200 dark:border-slate-800/80 focus:ring-teal-500 focus:border-teal-505'
            }
            disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer
          `}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs font-medium text-red-550 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default Select;
