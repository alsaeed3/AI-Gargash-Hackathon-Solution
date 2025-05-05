const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  carId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Car'
  },
  appointmentType: {
    type: String,
    required: [true, 'Please specify appointment type'],
    enum: ['test-drive', 'service', 'consultation']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Please specify appointment date and time']
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  notes: {
    type: String
  },
  contactDetails: {
    name: {
      type: String,
      required: [true, 'Please provide contact name']
    },
    email: {
      type: String,
      required: [true, 'Please provide contact email'],
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'Please provide a valid email'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Please provide contact phone']
    }
  },
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

module.exports = mongoose.model('Appointment', AppointmentSchema);