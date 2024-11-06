import express from 'express';
import { joinChallenge, completeChallenge } from '../controllers/challengeController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Join a challenge
router.post('/:challengeId/join', authenticate, joinChallenge);

// Complete a challenge
router.post('/:challengeId/complete', authenticate, completeChallenge);

export default router;
