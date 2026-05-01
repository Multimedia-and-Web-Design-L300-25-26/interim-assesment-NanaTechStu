// server.js — Main entry point
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────

// Allow requests from your frontend URL (set in .env)
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true, // Required for cookies to be sent cross-origin
}));

app.use(express.json());       // Parse incoming JSON request bodies
app.use(cookieParser());       // Parse cookies (needed for JWT in HTTP-only cookies)

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',   require('./routes/authRoutes'));
app.use('/api/crypto', require('./routes/cryptoRoutes'));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Coinbase Backend API is running ✅' });
});

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});