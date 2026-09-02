const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  venue: { type: String, required: true },
  category: { type: String, enum: ['Marathon', 'Cycling', 'Swimming', 'Triathlon', 'Duathlon', 'IRONMAN', 'HYROX', 'Devils Circuit'], required: true },
  distances: [{ type: String }],
  organizer: { type: String, required: true },
  registrationDeadline: { type: Date },
  registrationUrl: { type: String },
  sourceVerified: { type: Boolean, default: false },
  status: { type: String, enum: ['UPCOMING', 'CLOSED', 'COMPLETED'], default: 'UPCOMING' },
  startTime: { type: String },
  imageUrl: { type: String },
  price: { type: Number, default: 0 },
  priceVerified: { type: Boolean, default: false },
  priceNote: { type: String },
  registrationDetails: {
    maxParticipants: { type: Number },
    formFields: [String] // Custom fields for registration
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
