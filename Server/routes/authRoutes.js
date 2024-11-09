
// import express from 'express';
// import path from 'path';
// import { handleLogin } from '../controllers/authController.js';
// import { handleLogout } from '../controllers/logoutController.js';
// import { handleRefreshToken } from '../controllers/refreshTokenController.js';
// import { handleNewUser } from '../controllers/registerController.js';
// import { verifyJWT } from '../middleware/verifyJWT.js'; // JWT middleware for secure routes

// const router = express.Router();

// // Root route (optional)
// router.get('^/$|/index(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
// });

// // Public routes (no JWT required)
// router.post('/auth', handleLogin);
// router.get('/logout', handleLogout);
// router.get('/refresh', handleRefreshToken);
// router.post('/register', handleNewUser);

// // Protected routes (apply JWT middleware for security)
// router.use(verifyJWT);

// // Define protected routes here (after JWT verification)
// router.get('/protected', (req, res) => {
//     res.json({ message: "This is a protected route!" });
// });

// export default router;
// routes/authRoutes.js (based on your combined setup for multiple routes)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { handleLogin } from '../controllers/authController.js';
import { handleLogout } from '../controllers/logoutController.js';
import { handleRefreshToken } from '../controllers/refreshTokenController.js';
import { handleNewUser } from '../controllers/registerController.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.post('/auth', handleLogin);
router.get('/logout', handleLogout);
router.get('/refresh', handleRefreshToken);
router.post('/register', handleNewUser);

export default router;


