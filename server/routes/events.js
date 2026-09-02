const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getEvents,
  getEventsByCategory,
  getEventsByCity,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/event.controller');

const admin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') return res.status(403).json({ msg: 'Admin access required' });
  next();
};

// Public routes
router.get('/', getEvents);
router.get('/category/:category', getEventsByCategory);
router.get('/city/:city', getEventsByCity);
router.get('/:id', getEvent);

// Admin routes
router.post('/', auth, admin, createEvent);
router.put('/:id', auth, admin, updateEvent);
router.delete('/:id', auth, admin, deleteEvent);

module.exports = router;
