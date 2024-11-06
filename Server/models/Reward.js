// models/Reward.js
import mongoose from 'mongoose';

const RewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit' },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  points: { type: Number, required: true },
  dateEarned: { type: Date, default: Date.now }
});

export default mongoose.model('Reward', RewardSchema);
