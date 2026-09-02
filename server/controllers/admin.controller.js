const Ticket = require('../models/Ticket');
const User = require('../models/User');

exports.getDashboard = async (req, res) => {
  try {
    const [totalUsers, paidMembers, freeUsers, registrations, users] = await Promise.all([
      User.countDocuments({ role: { $ne: 'ADMIN' } }),
      User.countDocuments({ role: { $ne: 'ADMIN' }, membershipStatus: 'ACTIVE' }),
      User.countDocuments({ role: { $ne: 'ADMIN' }, membershipStatus: 'FREE' }),
      Ticket.countDocuments(),
      User.find({ role: { $ne: 'ADMIN' } }).select('name email phone countryCode address nationality membershipStatus membershipPrice city role createdAt').sort({ createdAt: -1 })
    ]);

    res.json({
      stats: { totalUsers, paidMembers, freeUsers, registrations },
      users
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Unable to load admin dashboard' });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Ticket.find()
      .populate('user', 'name email membershipStatus')
      .populate('event', 'title date location')
      .sort({ registrationDate: -1 });
    res.json(registrations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Unable to load registrations' });
  }
};

exports.updateSettings = async (req, res) => {
  const price = Number(req.body.membershipPrice);
  if (!Number.isFinite(price) || price < 0) {
    return res.status(400).json({ msg: 'Membership price must be a non-negative number' });
  }

  try {
    await User.updateMany({ role: 'ADMIN' }, { $set: { membershipPrice: price } });
    await User.updateMany({ role: { $ne: 'ADMIN' } }, { $set: { membershipPrice: price } });
    res.json({ membershipPrice: price });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Unable to update membership price' });
  }
};

exports.updateUser = async (req, res) => {
  const { membershipStatus } = req.body;
  if (!['FREE', 'ACTIVE'].includes(membershipStatus)) {
    return res.status(400).json({ msg: 'Invalid membership status' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, role: { $ne: 'ADMIN' } },
      { membershipStatus },
      { new: true, runValidators: true }
    ).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Unable to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id, role: { $ne: 'ADMIN' } });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    await Ticket.deleteMany({ user: user._id });
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Unable to remove user' });
  }
};