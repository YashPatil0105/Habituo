import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/profileController.js';
import { verifyJWT } from '../middleware/authenticate.js';

const router = express.Router();

// Route to get user profile
router.get('/profile', verifyJWT, getUserProfile);

// Route to update user profile (username and bio)
router.put('/profile', verifyJWT, updateUserProfile);

export default router;
