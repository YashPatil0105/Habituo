// models/challengeModel.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const challengeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalDays: { type: Number, default: 21 },
  completedDays: { type: [Boolean], default: new Array(21).fill(false) },
  completedDates: { type: [String], default: new Array(21).fill(null) },
  currentProgress: { type: Number, default: 0 },
  streakBroken: { type: Boolean, default: false },
  lastCompletedDate: { type: String, default: null },
  tasks: [taskSchema],
  streakRestoreAvailable: { type: Boolean, default: true }, // Allow for streak restoration
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Challenge = mongoose.model('Challenge', challengeSchema);
export default Challenge;
