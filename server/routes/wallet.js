const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getWallet, addMoney, withdrawMoney } = require('../controllers/wallet.controller');
router.use(auth);
router.get('/', getWallet);
router.post('/add', addMoney);
router.post('/withdraw', withdrawMoney);
module.exports = router;