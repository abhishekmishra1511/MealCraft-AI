import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './routes/ProtectedRoute';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loading pages for optimized bundle size & code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const RecipeGeneratorPage = lazy(() => import('./pages/RecipeGeneratorPage'));
const SavedRecipesPage = lazy(() => import('./pages/SavedRecipesPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SubscriptionPage = lazy(() => import('./pages/SubscriptionPage'));
const CooksPage = lazy(() => import('./pages/CooksPage'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {/* Global Toaster for premium user notices */}
            <Toaster
              position="top-right"
              toastOptions={{
                className: 'bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl shadow-lg font-sans text-sm',
                duration: 3500,
                success: {
                  iconTheme: {
                    primary: '#0d9488', // teal-600
                    secondary: '#fff',
                  },
                },
              }}
            />

            {/* Navigation Header */}
            <Navbar />

            {/* Main scrollable viewport */}
            <main className="flex-grow">
              <Suspense
                fallback={
                  <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                    <Loader message="Preparing kitchen workspace..." />
                  </div>
                }
              >
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/subscription" element={<SubscriptionPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/article/:id" element={<ArticlePage />} />
                  <Route path="/cooks" element={<CooksPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/recipe-generator"
                    element={
                      <ProtectedRoute>
                        <RecipeGeneratorPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/saved-recipes"
                    element={
                      <ProtectedRoute>
                        <SavedRecipesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/feedback"
                    element={
                      <ProtectedRoute>
                        <FeedbackPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch-all Fallback */}
                  <Route path="*" element={<LandingPage />} />
                </Routes>
              </Suspense>
            </main>

            {/* Footer Information */}
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
