const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  temperature: {
    type: Number,
    required: true
  },
  feelsLike: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  pressure: {
    type: Number,
    required: true
  },
  windSpeed: {
    type: Number,
    required: true
  },
  searchedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
weatherSchema.index({ city: 1, searchedAt: -1 });
weatherSchema.index({ searchedAt: -1 });

module.exports = mongoose.model('Weather', weatherSchema);