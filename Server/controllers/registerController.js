import User from '../models/User.js';
import bcrypt from 'bcrypt';

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // Check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict 

    try {
        // Encrypt the password
        // const hashedPwd = await bcrypt.hash(pwd, 10);
        const saltRounds = 10;
const myPlaintextPassword = pwd;
const someOtherPlaintextPassword = 'not_bacon';

const salt = bcrypt.genSaltSync(saltRounds);
const hashedPwd = bcrypt.hashSync(myPlaintextPassword, salt);

        // Create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

export { handleNewUser };
// controllers/registerController.js
// export const handleNewUser = async (req, res) => {
//     const { user, pwd } = req.body;
//     if (!user || !pwd) return res.status(400).json({ message: 'Username and password are required.' });

//     try {
//         const duplicate = await User.findOne({ username: user }).exec();
//         if (duplicate) return res.status(409).json({ message: 'Username already exists.' });

//         const newUser = new User({ username: user, password: pwd });
//         await newUser.save();

//         res.status(201).json({ success: `User ${user} created successfully.` });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// };
