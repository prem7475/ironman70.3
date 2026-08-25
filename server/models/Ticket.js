const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  ticketNumber: { type: String, required: true, unique: true },
  registrationDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Confirmed' },
  customData: mongoose.Schema.Types.Mixed // Data from registration form
});

module.exports = mongoose.model('Ticket', TicketSchema);
