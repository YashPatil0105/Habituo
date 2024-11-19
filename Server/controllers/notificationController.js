import Notification from "../models/Notification.js";
import mongoose from 'mongoose';

// Get all notifications for a user
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` is populated via authentication middleware
    // console.log(userId)
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    // console.log('Notifications:', notifications);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications", error: error.message });
  }
};

// Mark a notification as read/unread
// export const toggleNotificationRead = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const notification = await Notification.findById(id);

//     if (!notification) {
//       return res.status(404).json({ message: "Notification not found" });
//     }

//     notification.read = !notification.read;
//     await notification.save();

//     res.status(200).json(notification);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update notification", error: error.message });
//   }
// };
export const toggleNotificationRead = async (req, res) => {
  try {
    const notificationId = req.params.id;  // The ID is passed in the URL as a param

    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return res.status(400).json({ message: "Invalid notification ID" });
    }

    const notification = await Notification.findByIdAndUpdate(
      notificationId, 
      { read: true },  // or the toggling logic you need
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error("Error toggling notification read status:", error);
    res.status(500).json({ message: "Failed to update notification", error: error.message });
  }
};

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: "UserId and message are required" });
    }

    const newNotification = new Notification({ userId, message });
    await newNotification.save();

    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: "Failed to create notification", error: error.message });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notification", error: error.message });
  }
};
