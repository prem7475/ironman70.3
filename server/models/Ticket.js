const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  registrationId: { type: String, required: true, unique: true, index: true },
  bookingId: { type: String, required: true, unique: true, index: true },
  ticketNumber: { type: String, required: true, unique: true },
  bibNumber: { type: String, unique: true, sparse: true },
  category: { type: String, required: true },
  distance: { type: String },
  participant: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    age: { type: Number },
    gender: { type: String }
  },
  amount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  extraCharges: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  walletAmount: { type: Number, default: 0 },
  externalAmount: { type: Number, default: 0 },
  paymentSource: { type: String },
  paymentStatus: { type: String, default: 'Mock Payment Successful' },
  registrationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['PENDING', 'CONFIRMED', 'CANCELLED'], default: 'CONFIRMED' },
  customData: mongoose.Schema.Types.Mixed // Data from registration form
});

module.exports = mongoose.model('Ticket', TicketSchema);
