// // models/Reward.js
// import mongoose from 'mongoose';

// const RewardSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit' },
//   challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
//   points: { type: Number, required: true },
//   dateEarned: { type: Date, default: Date.now }
// });

// export default mongoose.model('Reward', RewardSchema);
// models/Reward.js
import mongoose from "mongoose";

const RewardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Links the reward to the user
    type: { type: String, enum: ["points", "badge"], required: true }, // Either "points" or "badge"
    points: { type: Number, default: 0 }, // For point rewards
    badgeName: { type: String, default: null }, // For badge rewards
    habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", default: null }, // Optional, links to a habit
    challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", default: null }, // Optional, links to a challenge
    dateEarned: { type: Date, default: Date.now }, // Timestamp for when the reward was earned
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("Reward", RewardSchema);
