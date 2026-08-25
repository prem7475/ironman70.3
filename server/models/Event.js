const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true }, // City
  category: { type: String }, // e.g., Marathon, Cycling, etc.
  imageUrl: { type: String },
  price: { type: Number, default: 0 },
  registrationDetails: {
    maxParticipants: { type: Number },
    formFields: [String] // Custom fields for registration
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
