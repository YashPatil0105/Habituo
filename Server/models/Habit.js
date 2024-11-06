// models/Habit.js
import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  frequency: { type: String, required: true }, // E.g., daily, weekly
  points: { type: Number, default: 10 }, // Points awarded for completion
  currentStreak: { type: Number, default: 0 }, // Track streak count
  lastCompleted: { type: Date }, // Last time the habit was completed
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Habit', HabitSchema);
