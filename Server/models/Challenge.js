// models/Challenge.js
import mongoose from 'mongoose';

const ChallengeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  points: { type: Number, default: 50 }, // Points for completion
  completed: { type: Boolean, default: false }, // Completion status
  deadline: { type: Date }, // Optional deadline for the challenge
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Challenge', ChallengeSchema);
