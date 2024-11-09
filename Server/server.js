import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { app } from './app.js';  // Import the app from your app.js

dotenv.config();  // Load environment variables

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed !! : ', err);
  });
