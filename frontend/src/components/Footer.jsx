import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-900 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🍳</span>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Meal Craft AI
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
              Generate gourmet recipes instantly using artificial intelligence. Eat healthier, reduce food waste, and discover new culinary dimensions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-slate-605 dark:text-slate-350 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/recipe-generator" className="text-sm text-slate-605 dark:text-slate-350 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Recipe Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-sm text-slate-605 dark:text-slate-350 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li className="text-sm text-slate-605 dark:text-slate-350 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors">
                Our Mission
              </li>
              <li className="text-sm text-slate-605 dark:text-slate-350 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors">
                Careers
              </li>
              <li>
                <Link to="/contact" className="text-sm text-slate-605 dark:text-slate-350 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Social */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-slate-605 dark:text-slate-350 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors">
                API Reference
              </li>
              <li className="text-sm text-slate-605 dark:text-slate-350 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="text-sm text-slate-605 dark:text-slate-350 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors">
                Terms of Service
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-slate-200/50 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {currentYear} Meal Craft AI. Built with premium React & Tailwind. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-400 dark:text-slate-500">
            <span>Designed for Health</span>
            <span>&bull;</span>
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
