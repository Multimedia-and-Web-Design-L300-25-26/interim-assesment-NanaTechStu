// controllers/cryptoController.js
const Crypto = require('../models/Crypto');

// ── GET /api/crypto — All cryptocurrencies ────────────────────────────────────
const getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: cryptos.length, data: cryptos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── GET /api/crypto/gainers — Top gainers (sorted by change24h desc) ──────────
const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change24h: { $gt: 0 } })
      .sort({ change24h: -1 });
    res.status(200).json({ success: true, count: gainers.length, data: gainers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── GET /api/crypto/new — New listings (sorted by createdAt desc) ─────────────
const getNewListings = async (req, res) => {
  try {
    const newCoins = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, count: newCoins.length, data: newCoins });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// ── POST /api/crypto — Add a new cryptocurrency ───────────────────────────────
const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    // Validate required fields
    if (!name || !symbol || price === undefined || change24h === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, symbol, price, and change24h.',
      });
    }

    const crypto = await Crypto.create({ name, symbol, price, image, change24h });
    res.status(201).json({ success: true, data: crypto });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('. ') });
    }
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { getAllCrypto, getTopGainers, getNewListings, addCrypto };