// models/Crypto.js
const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, 'Symbol is required'],
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      default: '', // URL to the coin logo
    },
    change24h: {
      type: Number,
      required: [true, '24h change is required'],
      default: 0,
      // e.g. +2.5 means +2.5%, -1.3 means -1.3%
    },
    marketCap: {
      type: Number,
      default: 0,
    },
    volume24h: {
      type: Number,
      default: 0,
    },
    isNew: {
      type: Boolean,
      default: true, // Newly added coins are flagged as new
    },
  },
  { timestamps: true } // createdAt used for "new listings" sort
);

module.exports = mongoose.model('Crypto', cryptoSchema);