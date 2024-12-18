import express from "express";
import {
  getChallenges,
  joinChallenge,
  createChallenge,
  updateProgress,restoreStreak
} from "../controllers/challengeController.js";

const router = express.Router();

router.get("/", getChallenges);
router.post("/join", joinChallenge);
router.post("/create", createChallenge);
router.post("/progress", updateProgress);
router.post("/restore", restoreStreak);

export default router;
