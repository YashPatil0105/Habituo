import express from "express";
import {
  getUserNotifications,
  toggleNotificationRead,
  createNotification,
  deleteNotification,
} from "../controllers/notificationController.js";
import { verifyJWT } from "../middleware/authenticate.js"; // Assuming you have an authentication middleware

const router = express.Router();

// Routes
router.get("/", verifyJWT, getUserNotifications); // Get all notifications for a user
router.put("/:id/toggle", verifyJWT, toggleNotificationRead); // Toggle notification read/unread
router.post("/", verifyJWT, createNotification); // Create a new notification
router.delete("/:id", verifyJWT, deleteNotification); // Delete a notification

export default router;
