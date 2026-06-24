import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 ease-out focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] shadow-lg border border-transparent',
    secondary: 'btn-glass focus:ring-1 focus:ring-teal-500',
    outline: 'border border-slate-800 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:border-slate-350 dark:hover:border-slate-700 focus:ring-1 focus:ring-teal-500',
    danger: 'bg-red-500/10 hover:bg-red-500 text-red-550 dark:text-red-405 hover:text-white border border-red-500/20 hover:border-transparent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs gap-2 rounded-xl',
    md: 'px-5 py-2.5 text-sm gap-2.5',
    lg: 'px-7 py-3.5 text-base gap-3 rounded-2xl',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && Icon && <Icon className="text-base shrink-0" />}
      {children}
    </button>
  );
};

export default Button;
