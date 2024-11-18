import User from "../models/User.js";
import Habit from "../models/Habit.js";
import Notification from "../models/Notification.js";

// // Fetch user dashboard data
// export const getUserDashboard = async (req, res) => {
//   const userId = req.userId; // Assuming `req.userId` is populated from middleware
//   console.log('User ID in request:', req.user._id);
//   console.log('user id is:' ,userId)
//   console.log('Decoded User Info:', req.user);

//   try {
//     const user = await User.findById(userId).select("-password").populate("streaks.habitId");
//     const tasks = await Habit.find({ userId });
//     const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(5);

//     res.status(200).json({
//       user,
//       tasks,
//       notifications,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching dashboard data", error });
//   }
// };
export const getUserDashboard = async (req, res) => {
    const userId = req.userId; // Use userId populated by the middleware
    // console.log('User ID in request:', userId); // Log the userId
    // console.log('Decoded User Info:', req.user); // Log the full user info
  
    try {
      // Fetch user data, tasks, and notifications
      const user = await User.findById(userId).select("-password").populate("streaks.habitId");
      const tasks = await Habit.find({ userId });
      const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(5);
  
      // Respond with the dashboard data
      res.status(200).json({
        user,
        tasks,
        notifications,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Error fetching dashboard data", error });
    }
  };

// Handle task completion
export const completeTask = async (req, res) => {
  const { taskId } = req.body;
  const userId = req.userId;

  try {
    const task = await Habit.findById(taskId);

    if (!task || task.userId.toString() !== userId) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;

    // Handle points and streak logic
    if (task.completed) {
      task.currentStreak += 1;
      task.lastCompleted = new Date();

      // Award points for completing the task
      const user = await User.findById(userId);
      user.points += task.points;

      // Check if the user earned a badge for streak
      if (task.currentStreak % 7 === 0) {
        // Reward user with a badge every 7 days streak
        user.badges.push({ badgeName: `Streak of ${task.currentStreak} days!` });
      }

      await user.save();
    } else {
      task.currentStreak = 0; // Reset streak if task is undone
    }

    await task.save();

    const notificationMessage = task.completed
      ? `🎉 Task "${task.title}" completed!`
      : `Task "${task.title}" marked as incomplete.`;

    await Notification.create({
      userId,
      message: notificationMessage,
    });

    res.status(200).json({ message: notificationMessage, task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Handle daily streak completion
export const completeDailyStreak = async (req, res) => {
  const userId = req.userId;
  const { habitId } = req.body;

  try {
    const habit = await Habit.findOne({ userId, _id: habitId });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Check if the habit's frequency is daily
    if (habit.frequency !== "daily") {
      return res.status(400).json({ message: "This habit is not a daily habit" });
    }

    // Check if the user has already completed the habit today
    const today = new Date().toISOString().split("T")[0];
    const lastCompletedDate = new Date(habit.lastCompleted).toISOString().split("T")[0];

    if (today === lastCompletedDate) {
      return res.status(400).json({ message: "You have already completed this habit today!" });
    }

    // Award points and handle streak logic
    habit.lastCompleted = new Date();
    habit.currentStreak += 1;

    if (habit.currentStreak % 7 === 0) {
      // Award badge after every 7-day streak
      const user = await User.findById(userId);
      user.badges.push({ badgeName: `Streak of ${habit.currentStreak} days!` });
      await user.save();
    }

    const user = await User.findById(userId);
    user.points += habit.points;

    await user.save();
    await habit.save();

    // Send notification
    await Notification.create({
      userId,
      message: `🎉 You completed your daily streak for "${habit.title}"! Keep up the great work!`,
    });

    res.status(200).json({ message: `You completed your daily streak for "${habit.title}"!`, habit });
  } catch (error) {
    res.status(500).json({ message: "Error completing daily streak", error });
  }
};

// Restore streak (if needed)
export const restoreStreak = async (req, res) => {
  const { habitId } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    const habit = await Habit.findById(habitId);

    if (!habit || !user.streakRestoreAvailable) {
      return res.status(400).json({ message: "Streak cannot be restored" });
    }

    habit.currentStreak = 0; // Reset streak
    user.streakRestoreAvailable = false; // Disable streak restore

    await habit.save();
    await user.save();

    await Notification.create({
      userId,
      message: "🔄 Your streak has been restored!",
    });

    res.status(200).json({ message: "Streak restored successfully", habit });
  } catch (error) {
    res.status(500).json({ message: "Error restoring streak", error });
  }
};
