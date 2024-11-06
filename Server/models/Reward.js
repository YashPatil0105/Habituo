// models/Reward.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const RewardSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  habit: {
    type: Schema.Types.ObjectId,
    ref: 'Habit',
  },
  challenge: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge',
  },
  dateEarned: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('Reward', RewardSchema);
