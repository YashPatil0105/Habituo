// models/Habit.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const HabitSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true,
  },
  targetDays: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: Date,
}, { timestamps: true });

export default mongoose.model('Habit', HabitSchema);
