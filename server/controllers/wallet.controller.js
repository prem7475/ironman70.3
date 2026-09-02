const crypto = require('crypto');
const User = require('../models/User');

exports.getWallet = async (req, res) => {
  const user = await User.findById(req.user.id).select('walletBalance walletTransactions');
  res.json(user);
};

exports.addMoney = async (req, res) => {
  const amount = Number(req.body.amount);
  const source = String(req.body.source || '');
  if (!Number.isFinite(amount) || amount <= 0 || !['UPI', 'CREDIT_CARD', 'DEBIT_CARD', 'NET_BANKING'].includes(source)) return res.status(400).json({ msg: 'Enter a valid amount and funding source' });
  const reference = `PF-WALLET-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const user = await User.findByIdAndUpdate(req.user.id, { $inc: { walletBalance: amount }, $push: { walletTransactions: { type: 'CREDIT', amount, source, reference } } }, { new: true }).select('walletBalance walletTransactions');
  res.json({ msg: 'Wallet credited successfully', reference, wallet: user });
};

exports.withdrawMoney = async (req, res) => {
  const amount = Number(req.body.amount);
  if (!Number.isFinite(amount) || amount <= 0) return res.status(400).json({ msg: 'Enter a valid amount' });
  const user = await User.findOneAndUpdate({ _id: req.user.id, walletBalance: { $gte: amount } }, { $inc: { walletBalance: -amount }, $push: { walletTransactions: { type: 'DEBIT', amount, source: 'WITHDRAWAL', reference: `PF-WITHDRAW-${crypto.randomBytes(4).toString('hex').toUpperCase()}` } } }, { new: true }).select('walletBalance walletTransactions');
  if (!user) return res.status(400).json({ msg: 'Insufficient wallet balance' });
  res.json({ msg: 'Wallet withdrawal recorded successfully', wallet: user });
};