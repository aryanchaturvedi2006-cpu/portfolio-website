import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import contactRoutes from './routes/contact.js';
import resumeRoutes from './routes/resume.js';
import { contactLimiter } from './middleware/rateLimiter.js';

dotenv.config();

const app = express();

// Trust reverse proxy for rate limiting on hosting platforms (Render, Railway, etc.)
app.set('trust proxy', 1);

// Connect to MongoDB Atlas
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration supporting comma-separated origins in CLIENT_URL
const configuredOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const allowedOrigins = Array.from(
  new Set([
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:4173',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4173',
    ...configuredOrigins
  ])
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }
      const normalizedOrigin = origin.trim().replace(/\/+$/, '');
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }
      return callback(new Error('Blocked by CORS policy'));
    },
    credentials: true
  })
);

// Body parser
app.use(express.json());

// Health check endpoint (Task 12)
app.get('/api/health', (req, res) => {
  const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const readyState = mongoose.connection.readyState;

  res.json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: {
      connected: readyState === 1,
      state: dbStates[readyState] || 'unknown'
    }
  });
});

// API Routes
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/resume', resumeRoutes);

// Global error handler
app.use((err, req, res, next) => {
  if (err?.message === 'Blocked by CORS policy') {
    return res.status(403).json({ success: false, error: 'Blocked by CORS policy' });
  }
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, error: 'Malformed JSON payload' });
  }
  return res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
