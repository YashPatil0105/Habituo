import express from "express";
import {
  getUserDashboard,
  completeTask,
  completeDailyStreak,
  restoreStreak,
} from "../controllers/userController.js";
// import { protect } from "../middleware/authMiddleware.js";
import {verifyJWT} from "../middleware/authenticate.js";


const router = express.Router();

router.get("/",verifyJWT,  getUserDashboard); // Get dashboard data
router.post("/task/complete",verifyJWT, completeTask); // Mark task as complete/incomplete
router.post("/streak/complete",verifyJWT,  completeDailyStreak); // Mark daily streak as complete
router.post("/streak/restore", verifyJWT,restoreStreak); // Restore streak

export default router;
