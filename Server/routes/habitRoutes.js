import express from 'express';
import { createHabit, getHabits, updateHabit, deleteHabit } from '../controllers/habitController.js';
import {verifyJWT} from '../middleware/authenticate.js';

const router = express.Router();

// Create a new habit
router.post('/', verifyJWT, createHabit);

// Get all habits for the authenticated user
router.get('/', verifyJWT, getHabits);

// Update a specific habit
router.put('/:habitId', verifyJWT, updateHabit);

// Delete a specific habit
router.delete('/:habitId', verifyJWT, deleteHabit);

export default router;
