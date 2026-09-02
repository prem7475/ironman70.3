const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  registerForRace,
  verifyRegistration,
  getMyRaces,
  getRegistration
} = require('../controllers/registration.controller');

// Register for events
router.post('/events/:eventId/register', auth, registerForRace);
router.post('/races/:eventId/register', auth, registerForRace);

// Verify registration
router.get('/verify/:registrationId', verifyRegistration);

// My races
router.get('/my-races', auth, getMyRaces);
router.get('/', auth, getMyRaces);

// Specific registration
router.get('/:registrationId', auth, getRegistration);

module.exports = router;
