// import Challenge from "../models/Challenge.js";
// import User from "../models/User.js";
// import Reward from "../models/Reward.js";

// /** Get all challenges */
// export const getChallenges = async (req, res) => {
//   try {
//     const challenges = await Challenge.find().populate("milestones.reward");
//     res.status(200).json(challenges);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch challenges" });
//   }
// };

// /** Join a challenge */
// export const joinChallenge = async (req, res) => {
//   const { userId, challengeId } = req.body;
//   try {
//     const challenge = await Challenge.findById(challengeId).populate("milestones.reward");
//     if (!challenge) return res.status(404).json({ error: "Challenge not found" });

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     if (challenge.participants.includes(userId))
//       return res.status(400).json({ error: "User already joined the challenge" });

//     challenge.participants.push(userId);

//     user.streaks.push({
//       habitId: challengeId,
//       streakCount: 0,
//       lastUpdated: new Date(),
//     });

//     await challenge.save();
//     await user.save();

//     res.status(200).json({ message: "Joined challenge successfully", challenge });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to join challenge" });
//   }
// };

// /** Update user progress */
// export const updateProgress = async (req, res) => {
//   const { userId, challengeId, completedDate } = req.body;
//   try {
//     const user = await User.findById(userId).populate("streaks.habitId");
//     if (!user) return res.status(404).json({ error: "User not found" });

//     const streak = user.streaks.find(
//       (streak) => String(streak.habitId) === challengeId
//     );

//     if (!streak) return res.status(404).json({ error: "Challenge not joined" });

//     const challenge = await Challenge.findById(challengeId).populate("milestones.reward");

//     const today = new Date(completedDate).toDateString();
//     const lastUpdated = new Date(streak.lastUpdated).toDateString();

//     if (today !== lastUpdated) {
//       streak.streakCount += 1;
//       streak.lastUpdated = completedDate;

//       const milestone = challenge.milestones.find(
//         (milestone) => milestone.day === streak.streakCount
//       );

//       if (milestone) {
//         const reward = milestone.reward;

//         if (reward) {
//           if (reward.type === "points") {
//             user.points += reward.points;
//           } else if (reward.type === "badge") {
//             user.badges.push({
//               badgeName: reward.badgeName,
//               dateEarned: new Date(),
//             });
//           }

//           await Reward.create({
//             userId,
//             type: reward.type,
//             points: reward.points,
//             badgeName: reward.badgeName,
//             challengeId,
//             dateEarned: new Date(),
//           });
//         }
//       }
//     }

//     await user.save();
//     res.status(200).json({ message: "Progress updated successfully", streak });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update progress" });
//   }
// };

  
// export const createChallenge = async (req, res) => {
//     const { title, category, duration, description, difficulty, milestones, userId } = req.body;
  
//     try {
//       // Validate input
//       if (!title || !category || !duration || !description || !difficulty || !userId) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }
  
//       // Validate and handle milestones (default to an empty array if not provided)
//       const validatedMilestones = Array.isArray(milestones) ? milestones : [];
  
//       const newChallenge = new Challenge({
//         title,
//         category,
//         duration,
//         description,
//         difficulty,
//         creator: userId,
//         milestones: [], // Initialize milestones as an empty array
//       });
  
//       // Process milestones
//       for (const milestone of validatedMilestones) {
//         if (!milestone.day || !milestone.reward || !milestone.reward.type) {
//           return res.status(400).json({ error: "Invalid milestone structure" });
//         }
  
//         // Create reward for the milestone
//         const reward = await Reward.create({
//           userId, // Pass the userId here
//           type: milestone.reward.type,
//           points: milestone.reward.points || 0,
//           badgeName: milestone.reward.badgeName || null,
//         });
  
//         // Add milestone to the challenge
//         newChallenge.milestones.push({
//           day: milestone.day,
//           reward: reward._id,
//         });
//       }
  
//       // Save the challenge
//       await newChallenge.save();
  
//       res.status(201).json({
//         message: "Challenge created successfully",
//         challenge: newChallenge,
//       });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).json({
//         error: "Failed to create challenge",
//         details: error.message,
//       });
//     }
//   };
  
import Challenge from "../models/Challenge.js";
import User from "../models/User.js";
import Reward from "../models/Reward.js";

/** Get all challenges */
export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().populate("milestones.reward");
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch challenges" });
  }
};

/** Join a challenge */
export const joinChallenge = async (req, res) => {
  const { userId, challengeId } = req.body;
  try {
    const challenge = await Challenge.findById(challengeId).populate("milestones.reward");
    if (!challenge) return res.status(404).json({ error: "Challenge not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (challenge.participants.includes(userId))
      return res.status(400).json({ error: "User already joined the challenge" });

    challenge.participants.push(userId);

    user.streaks.push({
      habitId: challengeId,
      streakCount: 0,
      lastUpdated: new Date(),
    });

    await challenge.save();
    await user.save();

    res.status(200).json({ message: "Joined challenge successfully", challenge });
  } catch (error) {
    res.status(500).json({ error: "Failed to join challenge" });
  }
};

/** Update user progress */
export const updateProgress = async (req, res) => {
  const { userId, challengeId, completedDate } = req.body;
  try {
    const user = await User.findById(userId).populate("streaks.habitId");
    if (!user) return res.status(404).json({ error: "User not found" });

    const streak = user.streaks.find(
      (streak) => String(streak.habitId) === challengeId
    );

    if (!streak) return res.status(404).json({ error: "Challenge not joined" });

    const challenge = await Challenge.findById(challengeId).populate("milestones.reward");

    const today = new Date(completedDate).toDateString();
    const lastUpdated = new Date(streak.lastUpdated).toDateString();

    if (today !== lastUpdated) {
      streak.streakCount += 1;
      streak.lastUpdated = completedDate;

      const milestone = challenge.milestones.find(
        (milestone) => milestone.day === streak.streakCount
      );

      if (milestone) {
        const reward = milestone.reward;

        if (reward) {
          if (reward.type === "points") {
            user.points += reward.points;
            await Reward.create({
              userId,
              type: "points",
              points: reward.points,
              badgeName: null,
              challengeId,
              dateEarned: new Date(),
            });
          } else if (reward.type === "badge") {
            if (!user.badges.some((badge) => badge.badgeName === reward.badgeName)) {
              user.badges.push({
                badgeName: reward.badgeName,
                dateEarned: new Date(),
              });
              await Reward.create({
                userId,
                type: "badge",
                points: 0,
                badgeName: reward.badgeName,
                challengeId,
                dateEarned: new Date(),
              });
            }
          }
        }
      }
    }

    await user.save();
    res.status(200).json({ message: "Progress updated successfully", streak });
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
};

export const createChallenge = async (req, res) => {
  const { title, category, duration, description, difficulty, milestones, userId } = req.body;

  try {
    // Validate input
    if (!title || !category || !duration || !description || !difficulty || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate and handle milestones (default to an empty array if not provided)
    const validatedMilestones = Array.isArray(milestones) ? milestones : [];

    const newChallenge = new Challenge({
      title,
      category,
      duration,
      description,
      difficulty,
      creator: userId,
      milestones: [], // Initialize milestones as an empty array
    });

    // Process milestones
    for (const milestone of validatedMilestones) {
      if (!milestone.day || !milestone.reward || !milestone.reward.type) {
        return res.status(400).json({ error: "Invalid milestone structure" });
      }

      // Create reward for the milestone
      const reward = await Reward.create({
        userId,
        type: milestone.reward.type,
        points: milestone.reward.points || 0,
        badgeName: milestone.reward.badgeName || null,
      });

      // Add milestone to the challenge
      newChallenge.milestones.push({
        day: milestone.day,
        reward: reward._id,
      });
    }

    // Save the challenge
    await newChallenge.save();

    res.status(201).json({
      message: "Challenge created successfully",
      challenge: newChallenge,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Failed to create challenge",
      details: error.message,
    });
  }
};
