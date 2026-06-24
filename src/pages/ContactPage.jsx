import React from 'react';
import { HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const ContactPage = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-[80vh] py-16 transition-colors duration-300">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            Contact & Support
          </h1>
          <p className="text-slate-500 mt-4 text-base leading-relaxed">
            Have an issue or need help? Reach out to us directly. We are here to assist you with any questions or concerns you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="zero-card p-6 rounded-3xl flex gap-5 items-start transition-transform hover:-translate-y-1 bg-white dark:bg-slate-900 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
              <div className="p-3.5 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                <HiOutlinePhone className="text-2xl" />
              </div>
              <div className="space-y-1.5 text-left">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Phone Support
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  8090084008
                </p>
                <p className="text-xs text-slate-400">Available Mon-Fri, 9am - 6pm</p>
              </div>
            </div>

            <div className="zero-card p-6 rounded-3xl flex gap-5 items-start transition-transform hover:-translate-y-1 bg-white dark:bg-slate-900 shadow-sm border border-slate-200/50 dark:border-slate-800/50">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                <HiOutlineMail className="text-2xl" />
              </div>
              <div className="space-y-1.5 text-left">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Email Support
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  support@mealcraftai.com
                </p>
                <p className="text-xs text-slate-400">We aim to reply within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Support Form */}
          <div className="zero-card p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-md border border-slate-200/50 dark:border-slate-800/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Describe your issue</h3>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                toast.success('Your message has been sent. We will get back to you soon!');
                e.target.reset();
              }} 
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Name</label>
                <input type="text" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-teal-500 text-slate-900 dark:text-slate-100 transition-colors" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input type="email" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-teal-500 text-slate-900 dark:text-slate-100 transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Issue Description</label>
                <textarea required rows={4} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-teal-500 text-slate-900 dark:text-slate-100 transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <Button type="submit" variant="primary" className="w-full py-3">Send Message</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
