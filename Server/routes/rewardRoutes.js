import express from 'express';
import { addPoints } from '../controllers/rewardController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Add reward points to the user
router.post('/points', authenticate, addPoints);

export default router;
