// routes/cryptoRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllCrypto,
  getTopGainers,
  getNewListings,
  addCrypto,
} = require('../controllers/cryptoController');

// IMPORTANT: specific routes (/gainers, /new) must come BEFORE the generic ones
router.get('/gainers', getTopGainers);
router.get('/new', getNewListings);
router.get('/', getAllCrypto);
router.post('/', addCrypto);

module.exports = router;