import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Routes imports
import projectRoutes from './routes/projects.js';
import commentRoutes from './routes/comments.js';
import certificateRoutes from './routes/certificates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS middleware
app.use((req, res, next) => {
  // Allow requests from anywhere in development, and specific origins in production
  const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://yourfrontendapp.vercel.app', 'https://yourfrontendapp.netlify.app'] 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178', 'http://localhost:5179', 'http://localhost:5180', 'http://localhost:5181', 'http://localhost:5182', 'http://localhost:5183', 'http://localhost:5184', 'http://localhost:5185', 'http://localhost:5186', 'http://localhost:5187', 'http://localhost:5188', 'http://localhost:5189', 'http://localhost:5190'];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
    res.header('Access-Control-Allow-Origin', origin || '*');
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Health check endpoint for Vercel
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running', env: process.env.NODE_ENV });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Portfolio Backend API', documentation: '/api/health' });
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/certificates', certificateRoutes);

// MongoDB Atlas connection string - using environment variable or direct string as fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mamgai75:roboticsandAI%40123@cluster0.aoj2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    
    // Start server after DB connection only in local development
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  })
  .catch(err => {
    console.error('MongoDB Atlas connection error:', err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    error: {
      message: 'Something went wrong on the server',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }
  });
});

// Export the Express app for Vercel
export default app; 