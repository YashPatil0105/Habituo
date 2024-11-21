// // controllers/rewardController.js
// import User from "../models/User.js";

// const BADGES = {
//   Beginner: { criteria: { daysTracked: 3 }, description: "Awarded upon tracking the first habit successfully for 3 days." },
//   Committed: { criteria: { streakDays: 7 }, description: "Awarded after maintaining a 7-day streak on any habit." },
//   Consistent: { criteria: { streakDays: 30 }, description: "Awarded for a 30-day streak in any habit." },
//   ChallengeSeeker: { criteria: { challengesJoined: 1 }, description: "Awarded upon joining the first challenge." },
//   ChallengeConqueror: { criteria: { challengesCompleted: 1 }, description: "Awarded upon completing a challenge." },
//   GoalGetter: { criteria: { points: 100 }, description: "Awarded for reaching 100 points across all activities." },
//   MasterOfHabits: { criteria: { streakDays: 90 }, description: "Awarded for consistently completing a habit for 90 days." },
//   HabitHero: { criteria: { goalsAchieved: 5 }, description: "Earned by achieving 5 different habit goals." },
//   StreakStar: { criteria: { streakDays: 60 }, description: "Awarded for completing a streak of 60 consecutive days." },
//   Perfectionist: { criteria: { challengesCompleted: 10 }, description: "Awarded when 10 challenges are completed successfully." },
// };

// // Update user rewards based on activity
// export const updateRewards = async (req, res) => {
//   const { userId, habitId, activity } = req.body; // `activity` can be "habit" or "challenge"

//   try {
//     const user = await User.findById(userId);

//     if (!user) return res.status(404).json({ error: "User not found" });

//     // Increment points
//     user.points += activity === "habit" ? 10 : 50;

//     // Update streak for the habit
//     const streak = user.streaks.find((s) => s.habitId.toString() === habitId);
//     if (streak) {
//       const today = new Date();
//       const isNextDay = new Date(streak.lastUpdated).setHours(0, 0, 0, 0) + 86400000 === today.setHours(0, 0, 0, 0);

//       if (isNextDay) streak.streakCount++;
//       else if (today > streak.lastUpdated) streak.streakCount = 1; // Reset streak if skipped a day

//       streak.lastUpdated = today;
//     } else {
//       user.streaks.push({ habitId, streakCount: 1, lastUpdated: new Date() });
//     }

//     // Check for badges
//     const earnedBadges = [];
//     if (!user.badges.some((badge) => badge.badgeName === "Beginner") && streak?.streakCount >= BADGES.Beginner.criteria.daysTracked) {
//       earnedBadges.push("Beginner");
//     }
//     if (!user.badges.some((badge) => badge.badgeName === "Committed") && streak?.streakCount >= BADGES.Committed.criteria.streakDays) {
//       earnedBadges.push("Committed");
//     }
//     if (!user.badges.some((badge) => badge.badgeName === "GoalGetter") && user.points >= BADGES.GoalGetter.criteria.points) {
//       earnedBadges.push("GoalGetter");
//     }
//     // Add checks for other badges...

//     earnedBadges.forEach((badgeName) => {
//       user.badges.push({ badgeName });
//     });

//     await user.save();

//     res.status(200).json({
//       message: "Rewards updated successfully",
//       points: user.points,
//       newBadges: earnedBadges,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// controllers/rewardController.js
import User from "../models/User.js";
import Reward from "../models/Reward.js";

const BADGES = {
  Beginner: { criteria: { daysTracked: 3 }, description: "Awarded upon tracking the first habit successfully for 3 days." },
  Committed: { criteria: { streakDays: 7 }, description: "Awarded after maintaining a 7-day streak on any habit." },
  Consistent: { criteria: { streakDays: 30 }, description: "Awarded for a 30-day streak in any habit." },
  ChallengeSeeker: { criteria: { challengesJoined: 1 }, description: "Awarded upon joining the first challenge." },
  ChallengeConqueror: { criteria: { challengesCompleted: 1 }, description: "Awarded upon completing a challenge." },
  GoalGetter: { criteria: { points: 100 }, description: "Awarded for reaching 100 points across all activities." },
  MasterOfHabits: { criteria: { streakDays: 90 }, description: "Awarded for consistently completing a habit for 90 days." },
  HabitHero: { criteria: { goalsAchieved: 5 }, description: "Earned by achieving 5 different habit goals." },
  StreakStar: { criteria: { streakDays: 60 }, description: "Awarded for completing a streak of 60 consecutive days." },
  Perfectionist: { criteria: { challengesCompleted: 10 }, description: "Awarded when 10 challenges are completed successfully." },
};

export const updateRewards = async (req, res) => {
  const { userId, habitId, activity } = req.body; // `activity` can be "habit" or "challenge"

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    // Increment points
    const pointsEarned = activity === "habit" ? 10 : 50;
    user.points += pointsEarned;

    // Log points reward
    await Reward.create({
      userId,
      type: "points",
      points: pointsEarned,
      habitId: habitId || null,
      dateEarned: new Date(),
    });

    // Update streak for the habit
    const streak = user.streaks.find((s) => s.habitId.toString() === habitId);
    if (streak) {
      const today = new Date();
      const isNextDay = new Date(streak.lastUpdated).setHours(0, 0, 0, 0) + 86400000 === today.setHours(0, 0, 0, 0);

      if (isNextDay) streak.streakCount++;
      else if (today > streak.lastUpdated) streak.streakCount = 1; // Reset streak if skipped a day

      streak.lastUpdated = today;
    } else {
      user.streaks.push({ habitId, streakCount: 1, lastUpdated: new Date() });
    }

    // Check for badges
    const earnedBadges = [];

    // Check for "Beginner" badge
    if (!user.badges.some((badge) => badge.badgeName === "Beginner") && streak?.streakCount >= BADGES.Beginner.criteria.daysTracked) {
      earnedBadges.push("Beginner");
    }
    
    // Check for "Committed" badge
    if (!user.badges.some((badge) => badge.badgeName === "Committed") && streak?.streakCount >= BADGES.Committed.criteria.streakDays) {
      earnedBadges.push("Committed");
    }
    
    // Check for "Consistent" badge
    if (!user.badges.some((badge) => badge.badgeName === "Consistent") && streak?.streakCount >= BADGES.Consistent.criteria.streakDays) {
      earnedBadges.push("Consistent");
    }
    
    // Check for "ChallengeSeeker" badge
    if (!user.badges.some((badge) => badge.badgeName === "ChallengeSeeker") && user.challengesJoined >= BADGES.ChallengeSeeker.criteria.challengesJoined) {
      earnedBadges.push("ChallengeSeeker");
    }
    
    // Check for "ChallengeConqueror" badge
    if (!user.badges.some((badge) => badge.badgeName === "ChallengeConqueror") && user.challengesCompleted >= BADGES.ChallengeConqueror.criteria.challengesCompleted) {
      earnedBadges.push("ChallengeConqueror");
    }
    
    // Check for "GoalGetter" badge
    if (!user.badges.some((badge) => badge.badgeName === "GoalGetter") && user.points >= BADGES.GoalGetter.criteria.points) {
      earnedBadges.push("GoalGetter");
    }
    
    // Check for "MasterOfHabits" badge
    if (!user.badges.some((badge) => badge.badgeName === "MasterOfHabits") && streak?.streakCount >= BADGES.MasterOfHabits.criteria.streakDays) {
      earnedBadges.push("MasterOfHabits");
    }
    
    // Check for "HabitHero" badge
    if (!user.badges.some((badge) => badge.badgeName === "HabitHero") && user.goalsAchieved >= BADGES.HabitHero.criteria.goalsAchieved) {
      earnedBadges.push("HabitHero");
    }
    
    // Check for "StreakStar" badge
    if (!user.badges.some((badge) => badge.badgeName === "StreakStar") && streak?.streakCount >= BADGES.StreakStar.criteria.streakDays) {
      earnedBadges.push("StreakStar");
    }
    
    // Check for "Perfectionist" badge
    if (!user.badges.some((badge) => badge.badgeName === "Perfectionist") && user.challengesCompleted >= BADGES.Perfectionist.criteria.challengesCompleted) {
      earnedBadges.push("Perfectionist");
    }
    

    

    for (const badgeName of earnedBadges) {
      user.badges.push({ badgeName });

      // Log badge reward
      await Reward.create({
        userId,
        type: "badge",
        badgeName,
        dateEarned: new Date(),
      });
    }

    await user.save();

    res.status(200).json({
      message: "Rewards updated successfully",
      points: user.points,
      newBadges: earnedBadges,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getUserRewards = async (req, res) => {
  const { userId } = req.params;

  try {
    const rewards = await Reward.find({ userId }).sort({ dateEarned: -1 });
    res.status(200).json(rewards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new reward manually
export const createReward = async (req, res) => {
  const { userId, type, points, badgeName, habitId, challengeId } = req.body;

  try {
    if (!userId || !type) {
      return res.status(400).json({ error: "userId and type are required fields." });
    }

    // Validate reward type
    if (type === "points" && !points) {
      return res.status(400).json({ error: "Points must be specified for 'points' type reward." });
    }
    if (type === "badge" && !badgeName) {
      return res.status(400).json({ error: "Badge name must be specified for 'badge' type reward." });
    }

    const reward = await Reward.create({
      userId,
      type,
      points: points || 0,
      badgeName: badgeName || null,
      habitId: habitId || null,
      challengeId: challengeId || null,
      dateEarned: new Date(),
    });

    res.status(201).json({
      message: "Reward created successfully",
      reward,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
