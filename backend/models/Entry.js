const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    default: 'Unknown',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Entry', entrySchema);
