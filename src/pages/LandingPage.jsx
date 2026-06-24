import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { feedbackService } from '../services/feedbackService';
import { 
  HiOutlineSparkles, 
  HiOutlineArrowNarrowRight, 
  HiOutlineShieldCheck, 
  HiOutlineTrash, 
  HiOutlineClock, 
  HiOutlineCamera, 
  HiOutlineGlobe, 
  HiOutlineHeart, 
  HiOutlinePlus, 
  HiOutlineMinus,
  HiStar,
  HiOutlinePhone,
  HiOutlineMail
} from 'react-icons/hi';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [heroPrompt, setHeroPrompt] = useState('');
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await feedbackService.getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to load testimonials', error);
      }
    };
    fetchTestimonials();
  }, []);

  // FAQ state control
  const [openFaq, setOpenFaq] = useState(null);

  // Multilingual state control
  const [activeLang, setActiveLang] = useState('English');

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!heroPrompt.trim()) return;
    
    // Redirect to generator with the input pre-filled in route state
    navigate('/recipe-generator', { state: { initialPrompt: heroPrompt } });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      icon: HiOutlineTrash,
      title: "Leftover Recipes",
      description: "Got random stuff in the fridge? The AI turns it into an actual meal. No more staring at ingredients wondering what to make.",
      color: "bg-teal-500/10 text-teal-600 dark:text-teal-400"
    },
    {
      icon: HiOutlineHeart,
      title: "Diet-Specific Recipes",
      description: "Keto, vegan, gluten-free, high-protein. Set your dietary preferences once and every recipe respects them automatically.",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
    },
    {
      icon: HiOutlineClock,
      title: "Quick Weeknight Dinners",
      description: "30 minutes or less. Just tell the AI how much time you have and it keeps things quick.",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    },
    {
      icon: HiOutlineGlobe,
      title: "Indian Cuisine Explorer",
      description: "North Indian, South Indian, Bengali, Punjabi, Gujarati. Pick any regional cuisine and get an authentic Indian recipe.",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    }
  ];

  const howItWorksSteps = [
    {
      number: "1",
      title: "Enter Ingredients",
      description: "Type in what you have in your fridge or a specific dish you're craving."
    },
    {
      number: "2",
      title: "AI Generation",
      description: "Our smart AI analyzes your input and instantly creates a personalized recipe."
    },
    {
      number: "3",
      title: "Cook & Save",
      description: "Follow the simple instructions to cook your meal and save it to your favorites."
    }
  ];

  const faqs = [
    {
      question: "Is Meal Craft AI free?",
      answer: "Yes, our frontend provides a fully responsive playground environment where you can generate, refresh, and save recipes locally to your device completely free."
    },
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

  const chefArticles = [
    {
      id: "keto-guide",
      title: "The Ultimate Guide to Keto",
      chef: "Chef Vikas",
      diet: "Keto",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
      description: "Discover how to maintain a state of ketosis without sacrificing the rich flavors of gourmet cooking."
    },
    {
      id: "plant-power",
      title: "Plant-Based Power",
      chef: "Chef Garima",
      diet: "Vegan",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
      description: "A comprehensive dive into sourcing complete proteins and essential nutrients on a strict vegan diet."
    },
    {
      id: "gluten-free-baking",
      title: "Gluten-Free Baking Secrets",
      chef: "Chef Sanjeev",
      diet: "Gluten-Free",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1615486171448-4afbfdfa17e0?auto=format&fit=crop&q=80&w=400",
      description: "Master the art of gluten-free baking with alternative flours to create perfect, fluffy pastries."
    }
  ];

  const mockTranslations = {
    'English': {
      prompt: "I have tomatoes, paneer, and onions. What can I make?",
      response: "You can make 'Kadai Paneer'! Here is a quick 30-minute recipe..."
    },
    'हिंदी (Hindi)': {
      prompt: "मेरे पास टमाटर, पनीर और प्याज हैं। मैं क्या बना सकता हूँ?",
      response: "आप 'कड़ाही पनीर' बना सकते हैं! यहाँ एक त्वरित 30 मिनट की रेसिपी है..."
    },
    'Español': {
      prompt: "Tengo tomates, paneer y cebollas. ¿Qué puedo hacer?",
      response: "¡Puedes preparar un delicioso 'Guiso de Paneer con Tomate'! Aquí tienes la receta..."
    },
    'Français': {
      prompt: "J'ai des tomates, du paneer et des oignons. Que puis-je faire ?",
      response: "Vous pouvez faire un 'Kadai Paneer' ! Voici une recette rapide de 30 minutes..."
    },
    'Deutsch': {
      prompt: "Ich habe Tomaten, Paneer und Zwiebeln. Was kann ich machen?",
      response: "Du kannst 'Kadai Paneer' machen! Hier ist ein schnelles 30-Minuten-Rezept..."
    },
    '中文 (Chinese)': {
      prompt: "我有西红柿、印式奶酪和洋葱。我能做什么？",
      response: "你可以做 'Kadai Paneer'！这是一个快速的30分钟食谱..."
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        {/* Neon blurred backgrounds */}
        <div className="absolute top-[-10%] left-[5%] w-[35vw] h-[35vw] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[5%] right-[-10%] w-[40vw] h-[40vw] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Heading and Interactive Input Form */}
          <div className="text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>✨</span> Free AI Recipe generator
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
              Generate Delicious <br />
              <span className="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Recipes with AI
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              Create personalized recipes instantly using ingredients you already have.
            </p>

            {/* Interactive Input Form */}
            <form onSubmit={handleHeroSubmit} className="max-w-xl pt-4">
              <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-950 p-2 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-lg focus-within:border-teal-500 transition-all">
                <input
                  type="text"
                  value={heroPrompt}
                  onChange={(e) => setHeroPrompt(e.target.value)}
                  placeholder="chicken tacos, spinach salad, or list ingredients..."
                  className="flex-grow px-4 py-3 text-sm bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
                />
                <Button
                  type="submit"
                  variant="primary"
                  icon={HiOutlineSparkles}
                  className="py-3 px-6 text-sm shrink-0 font-bold"
                >
                  Show me recipes
                </Button>
              </div>
            </form>

            {/* Quick Navigation Links */}
            <div className="flex flex-wrap items-center gap-3 pt-6 animate-fadeIn" style={{ animationDelay: '200ms' }}>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Explore:</span>
              <Link to="/about">
                <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 transition-all border border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800 shadow-sm hover:shadow">
                  About Us
                </button>
              </Link>
              <Link to="/cooks">
                <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 transition-all border border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800 shadow-sm hover:shadow">
                  Get Your Cook
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 transition-all border border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800 shadow-sm hover:shadow">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Glassmorphic Food Presentation Card */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="zero-card p-3 rounded-[2.5rem] relative group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 hover:shadow-2xl hover:shadow-teal-500/10 max-w-lg w-full">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
              
              {/* Clean glass food plate image */}
              <img 
                src="/glass_food_plate.png" 
                alt="Delicious gourmet food on glass platter" 
                className="rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3] border border-white/10 dark:border-slate-800/60"
              />
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
              Three simple steps to your next delicious meal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0 -translate-y-1/2 z-0"></div>
            
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="relative z-10 zero-card p-8 rounded-3xl text-center flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 shadow-lg">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl font-extrabold mb-6 shadow-inner group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPS / FEATURES GRID */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-b border-slate-100/80 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Beyond Leftovers
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
              Use Meal Craft AI for way more than just clearing out the fridge. Here are a few ideas to get you started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="zero-card p-6 rounded-3xl flex gap-5 items-start"
                >
                  <div className={`p-3.5 rounded-2xl ${feat.color} shrink-0`}>
                    <Icon className="text-2xl" />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {feat.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. COMPARISON TABULAR SECTION */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            How Meal Craft AI Compares
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Here is what you get with us vs. other standard AI recipe tools.
          </p>
        </div>
        <div className="zero-card rounded-3xl overflow-hidden p-2">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-6 font-bold text-slate-800 dark:text-slate-200">Feature</th>
                <th className="py-4 px-6 font-bold text-teal-600">Meal Craft AI</th>
                <th className="py-4 px-6 font-bold text-slate-400 dark:text-slate-500">Other AI Generators</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 dark:border-slate-800/50">
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300 font-medium">Automatic Fallbacks</td>
                <td className="py-4 px-6 text-teal-500 font-bold text-lg">✓</td>
                <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-sm">Rarely</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800/50">
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300 font-medium">Local Favorites Storage</td>
                <td className="py-4 px-6 text-teal-500 font-bold text-lg">✓</td>
                <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-sm">No</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800/50">
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300 font-medium">Macro Nutritional Stats</td>
                <td className="py-4 px-6 text-teal-500 font-bold text-lg">✓</td>
                <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-sm">Sometimes</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300 font-medium">Dark-First Responsive Frame</td>
                <td className="py-4 px-6 text-teal-500 font-bold text-lg">✓</td>
                <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-sm">Web only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* NEW: MULTILINGUAL SUPPORT SECTION */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left side: Text */}
            <div className="space-y-5 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <HiOutlineGlobe className="text-base" /> Global Kitchen
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Speak your <span className="text-teal-600 dark:text-teal-400">language</span>.<br className="hidden sm:block" />Cook your cuisine.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Meal Craft AI understands and generates recipes in over 20+ languages including Hindi, Spanish, French, and Mandarin. No matter where you are from, your personalized recipes will always feel like home.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 pt-2">
                {Object.keys(mockTranslations).map(lang => (
                  <button 
                    key={lang} 
                    onClick={() => setActiveLang(lang)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-medium text-xs sm:text-sm shadow-sm transition-all duration-300 cursor-pointer flex-grow sm:flex-grow-0 text-center whitespace-nowrap ${
                      activeLang === lang 
                        ? 'bg-teal-600 text-white shadow-teal-500/20 scale-105' 
                        : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:-translate-y-1 hover:shadow-md'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side: Visual Representation */}
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none mt-4 lg:mt-0">
              <div className="zero-card p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] relative group border border-slate-200/50 dark:border-slate-800/50 shadow-xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-sm">
                 <div className="absolute top-[-10%] right-[-10%] w-[60vw] sm:w-[20vw] h-[60vw] sm:h-[20vw] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none transition-all duration-500"></div>
                 <div className="space-y-4 relative z-10 min-h-[160px] sm:min-h-[180px] flex flex-col justify-center">
                   <div className="flex items-start gap-2 sm:gap-3 animate-fadeIn">
                     <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-3 sm:p-4 rounded-2xl rounded-tl-none max-w-[90%] sm:max-w-[85%] text-xs sm:text-sm font-medium border border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all">
                       {mockTranslations[activeLang].prompt}
                     </div>
                   </div>
                   <div className="flex items-start gap-2 sm:gap-3 flex-row-reverse animate-fadeIn" style={{ animationDelay: '150ms' }}>
                     <div className="bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300 p-3 sm:p-4 rounded-2xl rounded-tr-none max-w-[90%] sm:max-w-[85%] text-xs sm:text-sm font-medium border border-teal-200/50 dark:border-teal-800/50 shadow-sm transition-all">
                       {mockTranslations[activeLang].response}
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: CHEF ARTICLES SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Chef Insights & Diets
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Read the latest articles from our professional chefs on mastering various dietary lifestyles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefArticles.map((article, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate(`/article/${article.id}`, { state: { article } })}
                className="zero-card rounded-[2rem] overflow-hidden group cursor-pointer flex flex-col hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-teal-600 dark:text-teal-400 text-xs font-bold px-3 py-1 rounded-full">
                    {article.diet}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                    <span>By {article.chef}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow">
                    {article.description}
                  </p>
                  <div className="mt-6 flex items-center text-teal-600 dark:text-teal-400 text-sm font-bold group-hover:gap-2 transition-all">
                    Read Article <HiOutlineArrowNarrowRight className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION SECTION */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Answers to common inquiries about the generator.
            </p>
          </div>

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
      </section>

      {/* NEW: TESTIMONIALS SECTION */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                What others are saying
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                See what others are saying about Meal Craft AI.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t._id} className="zero-card p-6 rounded-3xl flex flex-col justify-between">
                  <div>
                    <div className="flex space-x-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <HiStar key={i} className="text-amber-400 text-lg" />
                      ))}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 italic mb-6">"{t.message}"</p>
                  </div>
                  <div className="font-semibold text-teal-600 dark:text-teal-400">
                    — {t.userId?.name || 'Anonymous User'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* 5. CTA PANEL */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2rem] bg-gradient-to-br from-teal-600 to-teal-800 text-white p-8 md:p-16 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl text-left space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Ready to generate delicious meals?
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Create a free account to unlock profile updates, persistent saved favorites, and instant custom AI recipe generation.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/register">
                <Button variant="secondary" className="hover:scale-105 transition-transform" icon={HiOutlineArrowNarrowRight}>
                  Create Free Account
                </Button>
              </Link>
              <Link to="/recipe-generator">
                <button className="px-6 py-3 font-semibold text-white bg-teal-700/50 hover:bg-teal-700/80 rounded-xl border border-white/20 transition-all hover:scale-105 cursor-pointer">
                  Try Generator Instantly
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
