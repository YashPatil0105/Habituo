// models/User.js
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const BadgeSchema = new mongoose.Schema({
  badgeName: { type: String, required: true },
  dateEarned: { type: Date, default: Date.now },
});

const StreakSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
  streakCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  completedDays: [{ type: Date }],
});

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    badges: [BadgeSchema],
    streaks: [StreakSchema],
    refreshToken: [String],
    streakRestoreAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
export default mongoose.model("User", UserSchema);
