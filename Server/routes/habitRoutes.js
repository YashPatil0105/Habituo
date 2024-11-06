import express from 'express';
import { createHabit, getHabits, updateHabit, deleteHabit } from '../controllers/habitController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Create a new habit
router.post('/', authenticate, createHabit);

// Get all habits for the authenticated user
router.get('/', authenticate, getHabits);

// Update a specific habit
router.put('/:habitId', authenticate, updateHabit);

// Delete a specific habit
router.delete('/:habitId', authenticate, deleteHabit);

export default router;
