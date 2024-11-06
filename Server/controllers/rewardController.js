import User from '../models/User.js';

// Add Reward Points
export const addPoints = async (req, res) => {
    const { points } = req.body;
    try {
        const user = await User.findById(req.user._id);
        user.points += points;
        await user.save();

        // Award badges based on points
        if (user.points >= 100 && !user.badges.includes('Goal Getter')) {
            user.badges.push('Goal Getter');
            await user.save();
        }

        res.json({ message: 'Points added successfully', points: user.points });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add points', error });
    }
};
