// // models/challengeModel.js
// import mongoose from 'mongoose';

// const taskSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: { type: String, required: true },
//   completed: { type: Boolean, default: false },
// });

// const challengeSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   totalDays: { type: Number, default: 21 },
//   completedDays: { type: [Boolean], default: new Array(21).fill(false) },
//   completedDates: { type: [String], default: new Array(21).fill(null) },
//   currentProgress: { type: Number, default: 0 },
//   streakBroken: { type: Boolean, default: false },
//   lastCompletedDate: { type: String, default: null },
//   tasks: [taskSchema],
//   streakRestoreAvailable: { type: Boolean, default: true }, // Allow for streak restoration
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// const Challenge = mongoose.model('Challenge', challengeSchema);
// export default Challenge;
import mongoose from "mongoose";

const MilestoneSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  reward: { type: mongoose.Schema.Types.ObjectId, ref: "Reward", required: true },
});

const ChallengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Intermediate", "Hard"], required: true },
    milestones: [MilestoneSchema],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" }
  },
  { timestamps: true }
);

export default mongoose.model("Challenge", ChallengeSchema);
