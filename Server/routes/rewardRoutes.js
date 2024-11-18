import express from "express";
import { updateRewards, getUserRewards } from "../controllers/rewardController.js";

const router = express.Router();

router.post("/update", updateRewards); // Update rewards
router.get("/:userId", getUserRewards); // Get reward history for a user

export default router;
