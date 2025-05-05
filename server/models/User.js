const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String
  },
  preferences: {
    brands: [String],
    bodyTypes: [String],
    priceRange: {
      min: Number,
      max: Number
    },
    fuelTypes: [String],
    features: [String]
  },
  interactionHistory: [{
    type: {
      type: String,
      enum: ['car-view', 'test-drive', 'query', 'purchase']
    },
    itemId: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);