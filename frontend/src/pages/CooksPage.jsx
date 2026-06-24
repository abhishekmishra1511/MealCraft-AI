import React, { useState, useEffect } from 'react';
import { HiStar, HiCalendar, HiUserGroup } from 'react-icons/hi';
import Button from '../components/Button';
import { cookService } from '../services/cookService';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CooksPage = () => {
  const [cooks, setCooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hireLoading, setHireLoading] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCooks = async () => {
      try {
        const data = await cookService.getCooks();
        setCooks(data);
      } catch (error) {
        toast.error('Failed to load cooks');
      } finally {
        setLoading(false);
      }
    };
    fetchCooks();
  }, []);

  const handleHire = async (cookId) => {
    if (!isAuthenticated) {
      toast.error('Please log in to get your cook');
      navigate('/login');
      return;
    }

    // Default to hiring for tomorrow for simplicity in this demo
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    setHireLoading(cookId);
    try {
      await cookService.hireCook(cookId, tomorrow.toISOString());
      toast.success('Request submitted! The cook will contact you soon.');
    } catch (error) {
      toast.error('Failed to submit request');
    } finally {
      setHireLoading(null);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-teal-600">Loading professionals...</div>;
  }

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Get Your Cook
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            Bring the restaurant experience to your dining room. Get our verified professional chefs for a daily culinary experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cooks.map((cook) => (
            <div key={cook._id} className="zero-card rounded-[2rem] overflow-hidden flex flex-col transition-transform hover:-translate-y-2 duration-300">
              <img src={cook.imageUrl} alt={cook.name} className="w-full h-56 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{cook.name}</h3>
                  <div className="flex items-center bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded-lg">
                    <HiStar className="text-teal-500 mr-1" />
                    <span className="text-sm font-semibold text-teal-700 dark:text-teal-400">{cook.rating}</span>
                  </div>
                </div>
                <p className="text-teal-600 dark:text-teal-400 font-medium text-sm mb-4">{cook.specialty}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">{cook.bio}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Daily Rate</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">₹{cook.dailyRate}</p>
                  </div>
                  <Button 
                    variant="primary" 
                    className="rounded-xl px-6"
                    onClick={() => handleHire(cook._id)}
                    loading={hireLoading === cook._id}
                  >
                    Get Your Cook
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CooksPage;
