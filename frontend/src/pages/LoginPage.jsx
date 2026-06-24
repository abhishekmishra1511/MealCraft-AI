import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMail, HiLockClosed, HiArrowLeft } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect away
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Forgot Password Mode
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  // Read saved email on mount if Remember Me was checked previously
  useEffect(() => {
    const savedEmail = localStorage.getItem('recipe_app_remember_email');
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      // Remember me email handling
      if (rememberMe) {
        localStorage.setItem('recipe_app_remember_email', formData.email);
      } else {
        localStorage.removeItem('recipe_app_remember_email');
      }

      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } else {
      toast.error(result.message || 'Login failed. Please verify credentials.');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setForgotLoading(true);
    // Simulate API reset delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setForgotLoading(false);
    
    toast.success(`Password reset link sent to ${forgotEmail}!`);
    setIsForgotMode(false);
    setForgotEmail('');
  };

  if (isForgotMode) {
    return (
      <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <button
              onClick={() => setIsForgotMode(false)}
              className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 mb-4 transition-colors cursor-pointer"
            >
              <HiArrowLeft />
              <span>Back to Login</span>
            </button>
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">
              Reset Password
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Enter your email and we'll send a link to restore access.
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-fadeIn">
          <div className="zero-card py-8 px-6 rounded-[2rem] sm:px-10">
            <form className="space-y-5" onSubmit={handleForgotSubmit}>
              <Input
                label="Email Address"
                id="forgotEmail"
                type="email"
                placeholder="chef.sneha@cookai.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                icon={HiMail}
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  loading={forgotLoading}
                  className="w-full py-3"
                >
                  Send Recovery Link
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link to="/" className="inline-flex text-3xl mb-4">🍳</Link>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-fadeIn">


        <div className="zero-card py-8 px-6 rounded-[2rem] sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="chef.sneha@cookai.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={HiMail}
              required
            />

            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={HiLockClosed}
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4.5 w-4.5 text-teal-600 focus:ring-teal-500 border-slate-350 dark:border-slate-800 rounded bg-white dark:bg-slate-950 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  Remember Me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setIsForgotMode(true)}
                  className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full py-3 shadow-md shadow-teal-600/10"
              >
                Sign In & Cook
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
