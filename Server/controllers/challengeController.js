import Challenge from '../models/Challenge.js';
import User from '../models/User.js';

// Join Challenge
export const joinChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.challengeId);
        if (!challenge.participants.includes(req.user._id)) {
            challenge.participants.push(req.user._id);
            await challenge.save();

            const user = await User.findById(req.user._id);
            if (!user.badges.includes('Challenge Seeker')) {
                user.badges.push('Challenge Seeker');
                await user.save();
            }
            res.json({ message: 'Challenge joined successfully', challenge });
        } else {
            res.status(400).json({ message: 'Already joined' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to join challenge', error });
    }
};

// Complete Challenge
export const completeChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.challengeId);
        if (challenge.participants.includes(req.user._id)) {
            challenge.completedBy.push(req.user._id);
            await challenge.save();

            const user = await User.findById(req.user._id);
            if (!user.badges.includes('Challenge Conqueror')) {
                user.badges.push('Challenge Conqueror');
                await user.save();
            }
            res.json({ message: 'Challenge completed', challenge });
        } else {
            res.status(400).json({ message: 'You must join the challenge first' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to complete challenge', error });
    }
};
