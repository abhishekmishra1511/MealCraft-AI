import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { recipeService } from '../services/recipeService';
import Loader from '../components/Loader';
import { HiStar, HiOutlineSparkles, HiOutlineBookmark, HiOutlineClock, HiOutlineChevronRight, HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import { feedbackService } from '../services/feedbackService';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ saved: 0, generated: 24 });
  const [loading, setLoading] = useState(true);
  const [recentSaved, setRecentSaved] = useState([]);
  const [activities, setActivities] = useState([]);
  
  // Feedback state
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  
  // FAQ State
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I filter recipes by food allergies?",
      answer: "Absolutely! You can choose Vegetarian, Vegan, Keto, Gluten-Free, or High Protein configurations from the filters list to keep recipes aligned with your allergies or targets."
    },
    {
      question: "Are recipes saved automatically?",
      answer: "Yes, once you click the 'Save' badge on a generated recipe card, it registers instantly in your Local Storage repository so you can browse, filter, or delete it later on the Saved Recipes tab."
    },
    {
      question: "How accurate are the cooking instructions?",
      answer: "Extremely accurate. The AI engine constructs detailed, step-by-step procedures specifying exact measurements and macronutrient specifications (calories, protein, carbohydrates, fats)."
    }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Load saved recipes to calculate exact statistics
        const result = await recipeService.getRecipeHistory();
        const savedList = result.recipes || [];
        setRecentSaved(savedList.slice(0, 3));
        
        // Calculate dynamic stats
        setStats({
          saved: savedList.length,
          generated: user?.generatedCount || 24
        });

        // Set up recent activities
        const mockActivities = [
          { id: 1, action: "Saved Recipe", detail: savedList[0]?.title || "Vibrant Paneer Tikka Masala", time: "2 hours ago" },
          { id: 2, action: "Generated Recipe", detail: "Custom Keto Italian Lunch", time: "1 day ago" },
          { id: 3, action: "Updated Profile", detail: "Changed bio details", time: "3 days ago" },
        ];
        setActivities(mockActivities);

        // Fetch testimonials
        const feedData = await feedbackService.getTestimonials();
        setTestimonials(feedData || []);
      } catch (err) {
        console.error('Error fetching dashboard info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Determine time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader message="Assembling your kitchen dashboard..." />
      </div>
    );
  }

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter a feedback message.');
      return;
    }

    setFeedbackLoading(true);
    try {
      await feedbackService.submitFeedback(rating, message, isPublic);
      toast.success('Thank you for your feedback!');
      setMessage('');
      setRating(5);
    } catch (error) {
      toast.error('Failed to submit feedback.');
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        
        {/* 1. WELCOME BANNER CARD */}
        <div className="relative rounded-[2rem] bg-gradient-to-br from-teal-600 to-teal-800 text-white p-8 overflow-hidden shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">
              {getGreeting()}, {user?.name || 'Chef'}! 👩‍🍳
            </h2>
            <p className="text-white/80 text-base max-w-xl">
              Ready to create something amazing today? Meal Craft AI is armed with ingredients, cuisines, and diets to fit your current mood.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
            <span className="text-3xl">🥦</span>
            <div className="text-left">
              <p className="text-xs text-white/70 uppercase font-bold tracking-wider">Kitchen Status</p>
              <p className="text-sm font-semibold text-white">Pantry Stocked</p>
            </div>
          </div>
        </div>

        {/* 2. STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="zero-card p-6 rounded-[2rem] flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 flex items-center justify-center text-2xl shadow-sm shrink-0">
              <HiOutlineBookmark />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Saved Favorites</p>
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">{stats.saved} recipes</h3>
            </div>
          </div>
          <div className="zero-card p-6 rounded-[2rem] flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400 flex items-center justify-center text-2xl shadow-sm shrink-0">
              <HiOutlineSparkles />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">AI Generated</p>
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">{stats.generated} times</h3>
            </div>
          </div>
        </div>

        {/* 3. SHORCUTS / QUICK ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Shortcuts */}
          <div className="zero-card p-6 rounded-[2rem] space-y-4 lg:col-span-1">
            <h4 className="text-lg font-bold text-slate-850 dark:text-white">
              Quick Shortcuts
            </h4>
            <div className="space-y-3">
              <Link
                to="/recipe-generator"
                className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-teal-50 dark:hover:bg-teal-950/20 border border-slate-100 dark:border-slate-800 hover:border-teal-100 dark:hover:border-teal-950/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚡</span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Generate Recipe</p>
                    <p className="text-xs text-slate-400">Launch AI cook assistant</p>
                  </div>
                </div>
                <HiOutlineChevronRight className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/saved-recipes"
                className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-teal-50 dark:hover:bg-teal-950/20 border border-slate-100 dark:border-slate-800 hover:border-teal-100 dark:hover:border-teal-950/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📂</span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Saved Recipes</p>
                    <p className="text-xs text-slate-400">Browse saved cooking history</p>
                  </div>
                </div>
                <HiOutlineChevronRight className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Recent Saved Recipes */}
          <div className="zero-card p-6 rounded-[2rem] space-y-4 lg:col-span-1">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-slate-850 dark:text-white">
                Favorite Recipes
              </h4>
              <Link to="/saved-recipes" className="text-xs font-semibold text-teal-650 hover:underline">
                View All
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentSaved.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  No saved recipes yet. Run the generator to save some!
                </div>
              ) : (
                recentSaved.map((recipe) => (
                  <Link
                    key={recipe.id}
                    to="/saved-recipes"
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-950 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all"
                  >
                    <span className="text-2xl bg-teal-50 dark:bg-teal-950/30 p-2 rounded-xl">🥗</span>
                    <div className="text-left flex-grow">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{recipe.title}</p>
                      <p className="text-xs text-slate-400">{recipe.cuisine} &bull; {recipe.mealType}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="zero-card p-6 rounded-[2rem] space-y-4 lg:col-span-1">
            <h4 className="text-lg font-bold text-slate-850 dark:text-white">
              Recent Activity
            </h4>
            <div className="space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="flex gap-3 text-sm">
                  <div className="relative flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0"></div>
                    <div className="w-0.5 bg-slate-200 dark:bg-slate-800 flex-grow mt-1.5"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {act.action}: <span className="font-normal text-slate-600 dark:text-slate-400">{act.detail}</span>
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <HiOutlineClock />
                      <span>{act.time}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 4. INDIAN DIETICIAN CHART */}
        <div className="zero-card p-6 rounded-[2rem] mt-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl bg-teal-50 dark:bg-teal-950/30 p-2 rounded-xl">🥗</span>
            <div>
              <h4 className="text-xl font-bold text-slate-850 dark:text-white">
                Indian Dietician's Recommended Diet Chart
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                A balanced daily Indian diet plan for maintaining health and wellness.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-teal-600 dark:text-teal-400 mb-2">Morning (8:00 AM)</h5>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <li>• 1 cup Green Tea or Lemon Water</li>
                <li>• 5 soaked Almonds & 1 Walnut</li>
                <li>• 2 Idlis or 1 bowl Poha / Upma</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-amber-500 mb-2">Lunch (1:00 PM)</h5>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <li>• 2 Multigrain Rotis</li>
                <li>• 1 bowl Dal (Lentils) / Rajma</li>
                <li>• 1 portion Seasonal Sabzi</li>
                <li>• 1 small bowl Curd (Dahi)</li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-purple-500 mb-2">Snacks (5:00 PM)</h5>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <li>• 1 cup Buttermilk (Chaas) / Tea</li>
                <li>• Handful of Roasted Makhana</li>
                <li>• Or 1 Fresh Fruit (Apple/Papaya)</li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-indigo-500 mb-2">Dinner (8:00 PM)</h5>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <li>• 1 bowl Light Soup (Tomato/Clear)</li>
                <li>• 1 Roti or small bowl Quinoa/Rice</li>
                <li>• 1 portion Paneer Bhurji / Soya</li>
                <li>• Mixed Green Salad</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5. PUBLIC TESTIMONIALS (FROM OTHER USERS) */}
        {testimonials.length > 0 && (
          <div className="mt-8 mb-8">
            <h4 className="text-xl font-bold text-slate-850 dark:text-white mb-6">
              What others are saying
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t) => (
                <div key={t._id} className="zero-card p-6 rounded-[2rem] flex flex-col justify-between">
                  <div>
                    <div className="flex space-x-1 mb-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <HiStar key={i} className="text-amber-400 text-lg" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-4">"{t.message}"</p>
                  </div>
                  <div className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                    — {t.userId?.name || 'Anonymous Cook'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5.5 FAQ ACCORDION SECTION */}
        <div className="mt-8 mb-8">
          <h4 className="text-xl font-bold text-slate-850 dark:text-white mb-6">
            Frequently Asked Questions
          </h4>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="zero-card rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    type="button"
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-teal-600 dark:text-teal-400">
                      {isOpen ? <HiOutlineMinus className="text-lg" /> : <HiOutlinePlus className="text-lg" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 border-t border-slate-100 dark:border-slate-800/40 mt-1">
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. QUICK FEEDBACK FORM */}
        <div className="zero-card p-6 md:p-8 rounded-[2rem] mt-8 mb-8 shadow-lg shadow-teal-500/5">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h4 className="text-2xl font-extrabold text-slate-850 dark:text-white mb-2">
                Rate your experience
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Your feedback helps us improve Meal Craft AI and the recipes we generate for you.
              </p>
              <div className="flex space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                  >
                    <HiStar className={`text-4xl ${rating >= star ? 'text-amber-400' : 'text-slate-200 dark:text-slate-800'}`} />
                  </button>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleFeedbackSubmit} className="flex-1 w-full space-y-4">
              <Textarea
                label="What did you like or dislike?"
                id="message"
                rows={3}
                placeholder="Tell us about your experience..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              
              <div className="flex items-center">
                <input
                  id="isPublicDashboard"
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="h-4.5 w-4.5 text-teal-600 focus:ring-teal-500 border-slate-350 dark:border-slate-800 rounded bg-white dark:bg-slate-950 cursor-pointer"
                />
                <label htmlFor="isPublicDashboard" className="ml-2 block text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  Allow my feedback to be shown as a public testimonial.
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto px-8"
                loading={feedbackLoading}
              >
                Submit Feedback
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
