// import express from 'express';
// import path from 'path';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { corsOptions } from './config/corsOptions.js'; // Import CORS options
// import { logger } from './middleware/logEvents.js'; // Import logger middleware
// import { errorHandler } from './middleware/errorHandler.js'; // Import error handler middleware
// import { verifyJWT } from './middleware/verifyJWT.js'; // Import JWT verification middleware
// import { credentials } from './middleware/credentials.js'; // Import credentials middleware

// // Import combined routes
// import authRoutes from './routes/authRoutes.js';

// const app = express();
// const PORT = process.env.PORT || 3500;

// // Use import.meta.url to get __dirname equivalent in ES Modules
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// // Custom middleware logger
// // app.use(logger);

// // Handle options credentials check - before CORS!
// app.use(credentials);

// // Cross-Origin Resource Sharing (CORS) setup
// app.use(cors(corsOptions));

// // Middleware to parse incoming requests
// app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// app.use(express.json({ limit: '16kb' }));

// // Middleware for cookies
// app.use(cookieParser());

// // Static file serving
// app.use(express.static(path.join(__dirname, 'public')));

// // Use the combined routes
// app.use('/', rootRouter);
// app.use('/register', registerRouter);
// app.use('/auth', authRouter);
// app.use('/refresh', refreshRouter);
// app.use('/logout', logoutRouter);

// // Protect API routes with JWT verification (middleware already applied in routes)
// app.use(verifyJWT);

// // Handle 404 for undefined routes
// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ error: '404 Not Found' });
//     } else {
//         res.type('txt').send('404 Not Found');
//     }
// });

// // Global error handler
// // app.use(errorHandler);

// export { app };
// import express from 'express';
// import path from 'path';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { corsOptions } from './config/corsOptions.js'; // Import CORS options
// import { logger } from './middleware/logEvents.js'; // Import logger middleware
// import { errorHandler } from './middleware/errorHandler.js'; // Import error handler middleware
// import { verifyJWT } from './middleware/verifyJWT.js'; // Import JWT verification middleware
// import { credentials } from './middleware/credentials.js'; // Import credentials middleware

// // Import combined routes (auth, register, etc.)
// import authRoutes from './routes/authRoutes.js'; // Single import for all routes
// // import rootRoutes from './routes/rootRoutes.js'; // Import root routes if separated

// const app = express();
// const PORT = process.env.PORT || 3500;

// // Use import.meta.url to get __dirname equivalent in ES Modules
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// // Handle options credentials check - before CORS!
// app.use(credentials);

// // Cross-Origin Resource Sharing (CORS) setup
// app.use(cors(corsOptions));

// // Middleware to parse incoming requests
// app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// app.use(express.json({ limit: '16kb' }));

// // Middleware for cookies
// app.use(cookieParser());

// // Static file serving
// app.use(express.static(path.join(__dirname, 'public')));

// // Use the combined routes for authentication, registration, logout, etc.
// // app.use('/', rootRoutes); // This will handle the root route
// app.use('/auth', authRoutes); // This will handle routes like /auth, /logout, /refresh, /register

// // Protect API routes with JWT verification (middleware already applied in routes)
// app.use(verifyJWT);

// // Handle 404 for undefined routes
// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ error: '404 Not Found' });
//     } else {
//         res.type('txt').send('404 Not Found');
//     }
// });

// // Global error handler
// // app.use(errorHandler); // Uncomment if you want to use the global error handler
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import { errorHandler } from './middleware/errorHandler.js';
import { credentials } from './middleware/credentials.js';
import { verifyJWT } from './middleware/authenticate.js';
// Import routes
import authRoutes from './routes/authRoutes.js';
import planRoutes from './routes/planRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import rewardRoutes from './routes/rewardRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import userRoutes from './routes/userRoutes.js';
const app = express();

// Directory setup for ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Handle CORS and credentials setup
app.use(credentials);
app.use(cors(corsOptions));

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Apply routes without verifyJWT for public access
app.use('/', authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/plans', planRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/notifications", notificationRoutes);
app.use('/api/users', userRoutes);

// Apply verifyJWT middleware **after** public routes for protected routes
app.use(verifyJWT);


// Error handling middleware
app.use(errorHandler);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app };

