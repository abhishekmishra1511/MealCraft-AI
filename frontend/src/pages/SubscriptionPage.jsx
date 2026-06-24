import React, { useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import Button from '../components/Button';
import { subscriptionService } from '../services/subscriptionService';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated, updateProfile } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = async (plan) => {
    if (!isAuthenticated) {
      toast.error('Please log in to upgrade your plan');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const data = await subscriptionService.upgrade(plan);
      toast.success(data.message);
      // Optional: Refresh user profile from context here
      // This will assume the context supports a profile refresh or we just manually update it
      // if updateProfile can fetch from server:
      // await updateProfile();
    } catch (error) {
      toast.error('Failed to upgrade plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-teal-600 dark:text-teal-400 font-semibold tracking-wide uppercase">Subscription</h2>
          <p className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            Choose the right plan for your kitchen
          </p>
          <p className="mt-4 text-xl text-slate-500 dark:text-slate-400">
            Unlock unlimited recipes, advanced nutritional insights, and exclusive cook hiring features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="zero-card rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 flex flex-col">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Basic</h3>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Perfect for getting started with AI recipes.</p>
            <p className="mt-8 text-5xl font-extrabold text-slate-900 dark:text-white">₹0<span className="text-xl font-medium text-slate-500">/mo</span></p>
            <ul className="mt-8 space-y-4 flex-1">
              {['5 AI Recipes per month', 'Basic nutritional info', 'Save up to 10 favorites'].map((feature, i) => (
                <li key={i} className="flex items-center">
                  <HiCheck className="text-teal-500 mr-3 text-xl flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full" variant="outline" disabled>Current Plan</Button>
          </div>

          {/* Pro Monthly */}
          <div className="zero-card rounded-[2rem] p-8 border-2 border-teal-500 relative transform md:-translate-y-4 shadow-2xl shadow-teal-500/10 flex flex-col bg-white dark:bg-slate-900">
            <div className="absolute top-0 right-0 -mt-4 mr-4 px-4 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Pro Monthly</h3>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Everything you need for daily culinary inspiration.</p>
            <p className="mt-8 text-5xl font-extrabold text-slate-900 dark:text-white">₹499<span className="text-xl font-medium text-slate-500">/mo</span></p>
            <ul className="mt-8 space-y-4 flex-1">
              {['Unlimited AI Recipes', 'Advanced nutritional insights', 'Unlimited favorites', 'Hire professional cooks', 'Ad-free experience'].map((feature, i) => (
                <li key={i} className="flex items-center">
                  <HiCheck className="text-teal-500 mr-3 text-xl flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="mt-8 w-full py-4 shadow-lg shadow-teal-500/25" 
              variant="primary"
              onClick={() => handleUpgrade('pro-monthly')}
              loading={loading}
            >
              Subscribe Monthly
            </Button>
          </div>

          {/* Pro Annual */}
          <div className="zero-card rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 flex flex-col">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Pro Annual</h3>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Save 20% with yearly billing.</p>
            <p className="mt-8 text-5xl font-extrabold text-slate-900 dark:text-white">₹399<span className="text-xl font-medium text-slate-500">/mo</span></p>
            <p className="text-sm text-teal-600 dark:text-teal-400 mt-1 font-medium">Billed ₹4,788 yearly</p>
            <ul className="mt-8 space-y-4 flex-1">
              {['All Pro Monthly features', 'Priority cook hiring', 'Exclusive chef-curated recipes', '1-on-1 diet consultation'].map((feature, i) => (
                <li key={i} className="flex items-center">
                  <HiCheck className="text-teal-500 mr-3 text-xl flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="mt-8 w-full" 
              variant="secondary"
              onClick={() => handleUpgrade('pro-annual')}
              loading={loading}
            >
              Subscribe Annually
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
