// models/User.js
import mongoose from "mongoose";

const BadgeSchema = new mongoose.Schema({
  badgeName: { type: String, required: true },
  dateEarned: { type: Date, default: Date.now },
});

const StreakSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit" },
  streakCount: { type: Number, default: 0 }, // Tracks streak milestones for each habit
  lastUpdated: { type: Date }, // Last time streak was updated
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 }, // Total points accumulated
  badges: [BadgeSchema], // Array of earned badges
  streaks: [StreakSchema], // Array for tracking streaks per habit
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
