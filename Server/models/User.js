// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const BadgeSchema = new mongoose.Schema({
  badgeName: { type: String, required: true },
  dateEarned: { type: Date, default: Date.now },
});

const StreakSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit" },
  streakCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }, // Set default for consistency
});

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    badges: [BadgeSchema],
    streaks: [StreakSchema],
    refreshToken: [String],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);


export default mongoose.model("User", UserSchema);
