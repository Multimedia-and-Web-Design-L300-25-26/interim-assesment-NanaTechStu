// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getProfile, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected route — requires valid JWT
router.get('/profile', protect, getProfile);

module.exports = router;