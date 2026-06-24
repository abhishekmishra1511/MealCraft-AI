import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import Button from '../components/Button';

const ArticlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors mb-8 group font-medium"
        >
          <HiOutlineArrowNarrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </button>

        <article className="zero-card rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="relative h-64 md:h-96 w-full">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-teal-600 dark:text-teal-400 text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
              {article.diet}
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-xs">
                  {article.chef.charAt(5)}
                </span>
                By {article.chef}
              </span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight">
              {article.title}
            </h1>

            <div className="prose prose-lg dark:prose-invert prose-teal max-w-none text-slate-600 dark:text-slate-300">
              <p className="text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-8">
                {article.description}
              </p>
              
              {article.content ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                <div className="space-y-6">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">The Core Principles</h3>
                  <p>
                    Nunc ut sem vitae risus tristique posuere. Nullam vulputate interdum nisl, vel egestas nisi iaculis vel. Fusce sed orci vitae metus ultrices congue. Curabitur vel accumsan ligula. 
                  </p>
                  <blockquote className="border-l-4 border-teal-500 pl-6 italic text-slate-700 dark:text-slate-300 my-8">
                    "Cooking is an art, but nutrition is a science. When you master both, you unlock a healthier lifestyle without sacrificing joy." - {article.chef}
                  </blockquote>
                  <p>
                    Phasellus condimentum elit in aliquet vestibulum. Donec interdum, turpis nec consequat ullamcorper, odio est accumsan lacus, sit amet accumsan est magna et mauris.
                  </p>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticlePage;
