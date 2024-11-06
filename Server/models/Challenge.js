// models/Challenge.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const ChallengeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  habits: [{
    type: Schema.Types.ObjectId,
    ref: 'Habit',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('Challenge', ChallengeSchema);
