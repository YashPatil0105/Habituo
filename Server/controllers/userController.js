// import User from "../models/User.js";
// import Habit from "../models/Habit.js";
// import Notification from "../models/Notification.js";
// import Challenge from "../models/Challenge.js";

// // // Fetch user dashboard data
// // export const getUserDashboard = async (req, res) => {
// //   const userId = req.userId; // Assuming `req.userId` is populated from middleware
// //   console.log('User ID in request:', req.user._id);
// //   console.log('user id is:' ,userId)
// //   console.log('Decoded User Info:', req.user);

// //   try {
// //     const user = await User.findById(userId).select("-password").populate("streaks.habitId");
// //     const tasks = await Habit.find({ userId });
// //     const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(5);

// //     res.status(200).json({
// //       user,
// //       tasks,
// //       notifications,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: "Error fetching dashboard data", error });
// //   }
// // };
// export const getUserDashboard = async (req, res) => {
//     const userId = req.userId; // Use userId populated by the middleware
//     // console.log('User ID in request:', userId); // Log the userId
//     // console.log('Decoded User Info:', req.user); // Log the full user info
  
//     try {
//       // Fetch user data, tasks, and notifications
//       const user = await User.findById(userId).select("-password").populate("streaks.habitId");
//       const tasks = await Habit.find({ userId });
//       const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(5);
  
//       // Respond with the dashboard data
//       res.status(200).json({
//         user,
//         tasks,
//         notifications,
//       });
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//       res.status(500).json({ message: "Error fetching dashboard data", error });
//     }
//   };

// // Handle task completion
// export const completeTask = async (req, res) => {
//   const { taskId } = req.body;
//   const userId = req.userId;

//   try {
//     const task = await Habit.findById(taskId);

//     if (!task || task.userId.toString() !== userId) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     task.completed = !task.completed;

//     // Handle points and streak logic
//     if (task.completed) {
//       task.currentStreak += 1;
//       task.lastCompleted = new Date();

//       // Award points for completing the task
//       const user = await User.findById(userId);
//       user.points += task.points;

//       // Check if the user earned a badge for streak
//       if (task.currentStreak % 7 === 0) {
//         // Reward user with a badge every 7 days streak
//         user.badges.push({ badgeName: `Streak of ${task.currentStreak} days!` });
//       }

//       await user.save();
//     } else {
//       task.currentStreak = 0; // Reset streak if task is undone
//     }

//     await task.save();

//     const notificationMessage = task.completed
//       ? `🎉 Task "${task.title}" completed!`
//       : `Task "${task.title}" marked as incomplete.`;

//     await Notification.create({
//       userId,
//       message: notificationMessage,
//     });

//     res.status(200).json({ message: notificationMessage, task });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating task", error });
//   }
// };

// // Handle daily streak completion
// export const completeDailyStreak = async (req, res) => {
//   const userId = req.userId;
//   const { habitId } = req.body;

//   try {
//     const habit = await Habit.findOne({ userId, _id: habitId });

//     if (!habit) {
//       return res.status(404).json({ message: "Habit not found" });
//     }

//     // Check if the habit's frequency is daily
//     if (habit.frequency !== "daily") {
//       return res.status(400).json({ message: "This habit is not a daily habit" });
//     }

//     // Check if the user has already completed the habit today
//     const today = new Date().toISOString().split("T")[0];
//     const lastCompletedDate = new Date(habit.lastCompleted).toISOString().split("T")[0];

//     if (today === lastCompletedDate) {
//       return res.status(400).json({ message: "You have already completed this habit today!" });
//     }

//     // Award points and handle streak logic
//     habit.lastCompleted = new Date();
//     habit.currentStreak += 1;

//     if (habit.currentStreak % 7 === 0) {
//       // Award badge after every 7-day streak
//       const user = await User.findById(userId);
//       user.badges.push({ badgeName: `Streak of ${habit.currentStreak} days!` });
//       await user.save();
//     }

//     const user = await User.findById(userId);
//     user.points += habit.points;

//     await user.save();
//     await habit.save();

//     // Send notification
//     await Notification.create({
//       userId,
//       message: `🎉 You completed your daily streak for "${habit.title}"! Keep up the great work!`,
//     });

//     res.status(200).json({ message: `You completed your daily streak for "${habit.title}"!`, habit });
//   } catch (error) {
//     res.status(500).json({ message: "Error completing daily streak", error });
//   }
// };

// // Restore streak (if needed)
// export const restoreStreak = async (req, res) => {
//   const { habitId } = req.body;
//   const userId = req.userId;

//   try {
//     const user = await User.findById(userId);
//     const habit = await Challenge.findById(habitId);

//     if (!habit || !user.streakRestoreAvailable) {
//       return res.status(400).json({ message: "Streak cannot be restored" });
//     }

//     habit.currentStreak = 0; // Reset streak
//     user.streakRestoreAvailable = false; // Disable streak restore

//     await habit.save();
//     await user.save();

//     await Notification.create({
//       userId,
//       message: "🔄 Your streak has been restored!",
//     });

//     res.status(200).json({ message: "Streak restored successfully", habit });
//   } catch (error) {
//     res.status(500).json({ message: "Error restoring streak", error });
//   }
// };

import User from "../models/User.js";
import Challenge from "../models/Challenge.js";
import Notification from "../models/Notification.js";

export const getUserDashboard = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    const challenges = await Challenge.find({ participants: userId });
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      user,
      challenges,
      notifications,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching dashboard data", error });
  }
};

export const completeTask = async (req, res) => {
  const { challengeId } = req.body;
  const userId = req.userId;

  try {
    const challenge = await Challenge.findById(challengeId);

    if (!challenge || !challenge.participants.includes(userId)) {
      return res.status(404).json({ message: "Challenge not found or user not participating" });
    }

    const user = await User.findById(userId);
    const userStreak = user.streaks.find(streak => streak.habitId.equals(challenge._id));

    if (!userStreak) {
      user.streaks.push({ habitId: challenge._id, streakCount: 1, lastUpdated: new Date() });
    } else {
      userStreak.streakCount += 1;
      userStreak.lastUpdated = new Date();
    }

    // Award points for completing the task
    user.points += 10; // Assuming 10 points per task completion

    // Check if the user earned a badge for streak
    const streakCount = userStreak ? userStreak.streakCount : 1;
    if (streakCount % 7 === 0) {
      // Reward user with a badge every 7 days streak
      user.badges.push({ badgeName: `${challenge.title} Streak of ${streakCount} days!` });
    }

    await user.save();

    const notificationMessage = `🎉 Task completed for "${challenge.title}"!`;

    await Notification.create({
      userId,
      message: notificationMessage,
    });

    res.status(200).json({ message: notificationMessage, challenge });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

export const completeDailyStreak = async (req, res) => {
  const userId = req.userId;
  const { challengeId } = req.body;

  try {
    const challenge = await Challenge.findById(challengeId);

    if (!challenge || !challenge.participants.includes(userId)) {
      return res.status(404).json({ message: "Challenge not found or user not participating" });
    }

    const user = await User.findById(userId);
    const userStreak = user.streaks.find(streak => streak.habitId.equals(challenge._id));

    // Check if the user has already completed the challenge today
    const today = new Date().toISOString().split("T")[0];
    const lastCompletedDate = userStreak ? new Date(userStreak.lastUpdated).toISOString().split("T")[0] : null;

    if (today === lastCompletedDate) {
      return res.status(400).json({ message: "You have already completed this challenge today!" });
    }

    // Update or create streak
    if (!userStreak) {
      user.streaks.push({ habitId: challenge._id, streakCount: 1, lastUpdated: new Date() });
    } else {
      userStreak.streakCount += 1;
      userStreak.lastUpdated = new Date();
    }

    // Award points
    user.points += 20; // Assuming 20 points for daily streak completion

    // Check for milestone rewards
    const streakCount = userStreak ? userStreak.streakCount : 1;
    const milestone = challenge.milestones.find(m => m.day === streakCount);
    if (milestone) {
      // TODO: Implement reward logic based on the milestone
      await Notification.create({
        userId,
        message: `🏆 You've reached a milestone in "${challenge.title}"! Check your rewards!`,
      });
    }

    await user.save();

    // Send notification
    await Notification.create({
      userId,
      message: `🎉 You completed your daily streak for "${challenge.title}"! Keep up the great work!`,
    });

    res.status(200).json({ message: `You completed your daily streak for "${challenge.title}"!`, challenge });
  } catch (error) {
    res.status(500).json({ message: "Error completing daily streak", error });
  }
};

export const restoreStreak = async (req, res) => {
  const { challengeId } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    const challenge = await Challenge.findById(challengeId);

    if (!challenge || !challenge.participants.includes(userId)) {
      return res.status(400).json({ message: "Challenge not found or user not participating" });
    }

    const userStreak = user.streaks.find(streak => streak.habitId.equals(challenge._id));

    if (!userStreak || user.streakRestoreAvailable === false) {
      return res.status(400).json({ message: "Streak cannot be restored" });
    }

    userStreak.streakCount = 0; // Reset streak
    userStreak.lastUpdated = new Date();
    user.streakRestoreAvailable = false; // Disable streak restore

    await user.save();

    await Notification.create({
      userId,
      message: `🔄 Your streak for "${challenge.title}" has been restored!`,
    });

    res.status(200).json({ message: "Streak restored successfully", challenge });
  } catch (error) {
    res.status(500).json({ message: "Error restoring streak", error });
  }
};

