import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-[80vh] py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="zero-card rounded-[2rem] p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Meal Craft AI</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              Revolutionizing the way you cook, one AI-generated recipe at a time.
            </p>
          </div>
          
          <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
              <p>
                At Meal Craft AI, our mission is to eliminate food waste and make healthy, delicious cooking accessible to everyone. We believe that technology can help us make better decisions about the food we eat, saving both time and money while discovering new culinary dimensions.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How It Started</h2>
              <p>
                Born out of the frustration of staring into an open fridge and wondering "what can I make with this?", Meal Craft AI was developed to be the ultimate kitchen assistant. By leveraging cutting-edge artificial intelligence, we've created a platform that understands ingredients, dietary restrictions, and flavor profiles to generate perfectly tailored recipes in seconds.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Us?</h2>
              <ul className="list-disc list-inside space-y-2 ml-2 text-slate-600 dark:text-slate-400">
                <li><strong>Zero Waste:</strong> Input what you have, get a recipe that uses it.</li>
                <li><strong>Personalized:</strong> Dietary restrictions? No problem. The AI adapts to you.</li>
                <li><strong>Authentic:</strong> From local favorites to international cuisine, our AI understands global flavors.</li>
                <li><strong>Constantly Evolving:</strong> Our models learn and improve continuously.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
