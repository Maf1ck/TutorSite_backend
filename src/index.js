import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import consultationRouter from './routers/consultation.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Correct client IP behind Render / Railway / nginx
app.set('trust proxy', 1);

// Enable CORS for frontend requests
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Math Tutor Backend is running!');
});

// Register consultation routes (mounted at /api)
app.use('/api', consultationRouter);

// Not Found Route Handler
app.use(notFoundHandler);

// Centralized Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
