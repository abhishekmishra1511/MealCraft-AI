import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Input = ({
  label,
  id,
  type = 'text',
  error,
  icon: Icon,
  className = '',
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

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
        <input
          id={id}
          type={inputType}
          required={required}
          className={`
            block w-full rounded-2xl border transition-all duration-300 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950/40
            ${Icon ? 'pl-11' : 'pl-4'}
            ${isPassword ? 'pr-11' : 'pr-4'}
            py-3 text-sm placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-1
            ${
              error
                ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500'
                : 'border-slate-200 dark:border-slate-800/80 focus:ring-teal-500 focus:border-teal-505'
            }
            disabled:opacity-40 disabled:cursor-not-allowed
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-650 dark:hover:text-slate-205 transition-colors"
          >
            {showPassword ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
          </button>
        )}
      </div>
      {error && <p className="text-xs font-medium text-red-550 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
