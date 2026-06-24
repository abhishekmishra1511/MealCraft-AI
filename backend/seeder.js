import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cook from './models/Cook.js';
import Feedback from './models/Feedback.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const mockCooks = [
  {
    name: 'Chef Sanjeev',
    specialty: 'North Indian & Mughlai',
    dailyRate: 1500,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Award-winning chef with 15 years of experience in fine dining. Available for premium daily hires.'
  },
  {
    name: 'Chef Priya',
    specialty: 'Authentic South Indian',
    dailyRate: 1200,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Specializes in rich, flavorful curries and traditional dosas. Will make your dinner party unforgettable.'
  },
  {
    name: 'Chef Vikas',
    specialty: 'Street Food & Chaat',
    dailyRate: 1000,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Master of Indian street food. Brings authentic flavors and a fun, interactive experience to your home.'
  }
];

const mockFeedbacks = [
  {
    rating: 5,
    message: "This AI Recipe generator is a lifesaver! I entered paneer and tomatoes and got an amazing restaurant-style Paneer Butter Masala recipe in seconds. Highly recommended!",
    isPublic: true,
  },
  {
    rating: 5,
    message: "The macro tracking and Indian dietary preferences are spot on. I've been using it to prep my keto-friendly vegetarian meals for the whole week.",
    isPublic: true,
  },
  {
    rating: 5,
    message: "Hired Chef Vikas for a weekend family gathering through the app. The chaat and street food he prepared were absolutely phenomenal. Best app ever!",
    isPublic: true,
  }
];

const importData = async () => {
  try {
    await Cook.deleteMany();
    await Feedback.deleteMany();
    // Do not delete users, just add dummy ones or fetch existing ones
    console.log('Previous Data cleared');
    
    await Cook.insertMany(mockCooks);
    
    // Create dummy Indian users for the testimonials
    const mockUsers = [
      { name: 'Aarav Patel', email: 'aarav@example.com', password: 'dummy_password' },
      { name: 'Neha Sharma', email: 'neha@example.com', password: 'dummy_password' },
      { name: 'Rohan Gupta', email: 'rohan@example.com', password: 'dummy_password' }
    ];
    
    const insertedUsers = await User.insertMany(mockUsers);

    // Link users to feedbacks
    const feedbacksWithUsers = mockFeedbacks.map((fb, index) => ({
      ...fb,
      userId: insertedUsers[index]._id
    }));
    
    // Create feedbacks
    await Feedback.insertMany(feedbacksWithUsers);
    
    console.log('Mock Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing data', error);
    process.exit(1);
  }
};

importData();
