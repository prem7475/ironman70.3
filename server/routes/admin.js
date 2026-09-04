const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = auth.admin;
const {
  getDashboard,
  getRegistrations,
  createUser,
  updateSettings,
  updateUser,
  deleteUser
} = require('../controllers/admin.controller');

router.use(auth, admin);
router.get('/dashboard', getDashboard);
router.get('/registrations', getRegistrations);
router.post('/users', createUser);
router.patch('/settings', updateSettings);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
