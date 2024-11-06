import Habit from '../models/Habit.js';

// Create Habit
export const createHabit = async (req, res) => {
    try {
        const habit = await Habit.create({ ...req.body, user: req.user._id });
        res.status(201).json({ message: 'Habit created successfully', habit });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create habit', error });
    }
};

// Get All Habits for a User
export const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user._id });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve habits', error });
    }
};

// Update Habit
export const updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findByIdAndUpdate(req.params.habitId, req.body, { new: true });
        res.json({ message: 'Habit updated successfully', habit });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update habit', error });
    }
};

// Delete Habit
export const deleteHabit = async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.habitId);
        res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete habit', error });
    }
};
