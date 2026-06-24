import React, { useState } from 'react';
import { HiStar } from 'react-icons/hi';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import { feedbackService } from '../services/feedbackService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter a feedback message.');
      return;
    }

    setLoading(true);
    try {
      await feedbackService.submitFeedback(rating, message, isPublic);
      toast.success('Thank you for your feedback!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <div className="zero-card rounded-[2rem] p-8 sm:p-12 shadow-xl shadow-teal-500/5">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 text-center">
            We value your feedback
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
            Help us improve the AI Recipe Generator experience.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Rate your experience
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                  >
                    <HiStar className={`text-4xl ${rating >= star ? 'text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              label="What did you like or dislike?"
              id="message"
              rows={5}
              placeholder="Tell us about your experience generating recipes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <div className="flex items-center">
              <input
                id="isPublic"
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="h-4.5 w-4.5 text-teal-600 focus:ring-teal-500 border-slate-350 dark:border-slate-800 rounded bg-white dark:bg-slate-950 cursor-pointer"
              />
              <label htmlFor="isPublic" className="ml-2 block text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                Allow my feedback to be shown as a testimonial on the public landing page.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              loading={loading}
            >
              Submit Feedback
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
