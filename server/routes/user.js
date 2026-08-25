const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Add middleware to verify JWT here

// Update Health Details
router.post('/health-details', async (req, res) => {
  try {
    const { userId, height, weight, age, gender } = req.body;

    const h = height / 100;
    const bmi = (weight / (h * h)).toFixed(1);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          'healthDetails.height': height,
          'healthDetails.weight': weight,
          'healthDetails.age': age,
          'healthDetails.gender': gender,
          'healthDetails.bmi': bmi
        }
      },
      { new: true }
    );

    res.json(user.healthDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
