import mongoose from 'mongoose';

const cookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    dailyRate: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
    },
    imageUrl: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Cook = mongoose.model('Cook', cookSchema);
export default Cook;
