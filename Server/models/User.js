// models/User.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  habits: [{
    type: Schema.Types.ObjectId,
    ref: 'Habit',
  }],
  challenges: [{
    type: Schema.Types.ObjectId,
    ref: 'Challenge',
  }],
  rewards: [{
    type: Schema.Types.ObjectId,
    ref: 'Reward',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
