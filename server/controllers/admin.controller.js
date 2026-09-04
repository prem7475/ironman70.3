const bcrypt = require('bcryptjs');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

exports.getDashboard = async (req, res) => {
  try {
    const [totalUsers, paidMembers, freeUsers, registrations, users] = await Promise.all([
      User.countDocuments({ role: { $ne: 'ADMIN' } }),
      User.countDocuments({ role: { $ne: 'ADMIN' }, membershipStatus: 'ACTIVE' }),
      User.countDocuments({ role: { $ne: 'ADMIN' }, membershipStatus: 'FREE' }),
      Ticket.countDocuments(),
      // EXCLUDE password, walletBalance, and walletTransactions for privacy
      User.find({ role: { $ne: 'ADMIN' } })
        .select('-password -walletBalance -walletTransactions')
        .sort({ createdAt: -1 })
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
      .populate('user', 'name email phone membershipStatus')
      .populate('event', 'title date location category price')
      .sort({ registrationDate: -1 });
    res.json(registrations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Unable to load registrations' });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, phone, nationality, membershipStatus, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Name, email and password are required' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      nationality: nationality || '',
      membershipStatus: membershipStatus === 'ACTIVE' ? 'ACTIVE' : 'FREE',
      role: role === 'ADMIN' ? 'ADMIN' : 'USER'
    });

    await user.save();
    const created = await User.findById(user._id).select('-password -walletBalance -walletTransactions');
    res.status(201).json(created);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Unable to create user' });
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
  const { name, email, phone, nationality, membershipStatus } = req.body;

  const updateFields = {};
  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (phone !== undefined) updateFields.phone = phone;
  if (nationality !== undefined) updateFields.nationality = nationality;
  if (membershipStatus && ['FREE', 'ACTIVE'].includes(membershipStatus)) {
    updateFields.membershipStatus = membershipStatus;
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, role: { $ne: 'ADMIN' } },
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password -walletBalance -walletTransactions');

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
