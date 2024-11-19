import express from "express";
import {
  getChallenges,
  joinChallenge,
  createChallenge,
  updateProgress,
} from "../controllers/challengeController.js";

const router = express.Router();

router.get("/", getChallenges);
router.post("/join", joinChallenge);
router.post("/create", createChallenge);
router.post("/progress", updateProgress);

export default router;
