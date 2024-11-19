import User from '../models/User.js';

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      username: user.username,
      points: user.points,
      badges: user.badges,
      streaks: user.streaks,
      bio: user.bio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  const { username, bio } = req.body;

  if (!username || !bio) {
    return res.status(400).json({ message: 'Username and bio are required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username;
    user.bio = bio;
    await user.save();

    res.status(200).json({
      username: user.username,
      points: user.points,
      badges: user.badges,
      streaks: user.streaks,
      bio: user.bio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
