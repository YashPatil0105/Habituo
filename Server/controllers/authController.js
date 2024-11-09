import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const foundUser = await User.findOne({ username: user }).exec();
        // console.log(foundUser);

        if (!foundUser) return res.sendStatus(401); // Unauthorized

        // Evaluate password
      const match =   bcrypt.compareSync(pwd, foundUser.password); // true
                    bcrypt.compareSync("someOtherPlaintextPassword", foundUser.password);
        // const match = await bcrypt.compare(pwd, foundUser.password);
        // console.log(match);
        if (!match) return res.sendStatus(401); // Unauthorized

        // const roles = Array.isArray(foundUser.roles)
        //     ? foundUser.roles
        //     : Object.values(foundUser.roles).filter(Boolean);

        // Create JWT tokens
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    // "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' } // Extended access token expiration
        );

        const newRefreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' } // Extended refresh token expiration
        );

        // Handle refresh token reuse detection
        let newRefreshTokenArray = cookies?.jwt
            ? foundUser.refreshToken.filter(rt => rt !== cookies.jwt)
            : foundUser.refreshToken;

        if (cookies?.jwt) {
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            if (!foundToken) {
                newRefreshTokenArray = []; // Invalidate all tokens if reuse is detected
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        // Save the new refresh token
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        // Set refresh token cookie securely
        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        // Send the access token to the user
        res.json({ accessToken });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {handleLogin};
