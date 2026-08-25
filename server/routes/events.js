const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Register for event
router.post('/register', async (req, res) => {
  try {
    const { userId, eventId, registrationData } = req.body;

    const ticketNumber = `PF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newTicket = new Ticket({
      user: userId,
      event: eventId,
      ticketNumber,
      customData: registrationData
    });

    await newTicket.save();

    await User.findByIdAndUpdate(userId, {
      $push: { registeredEvents: eventId }
    });

    res.json(newTicket);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
