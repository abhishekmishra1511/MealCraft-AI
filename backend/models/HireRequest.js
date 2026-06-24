import mongoose from 'mongoose';

const hireRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cook',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const HireRequest = mongoose.model('HireRequest', hireRequestSchema);
export default HireRequest;
