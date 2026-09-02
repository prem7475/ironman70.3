const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getMe, upgradeMembership, updateHealthDetails, getVo2Max } = require('../controllers/user.controller');

// Get Profile
router.get('/me', auth, getMe);
router.post('/membership', auth, upgradeMembership);

// Update Health Details
router.post('/health-details', auth, updateHealthDetails);

// VO2 Max Estimation
router.post('/vo2-max', auth, getVo2Max);

module.exports = router;
