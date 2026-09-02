const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  const adminEmail = 'sunny@paceforge.com';
  const adminPassword = 'admin@1234';

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    let user = await User.findOne({ email: adminEmail });
    if (user) {
      console.log('Admin user already exists. Updating to ADMIN role...');
      user.role = 'ADMIN';
      user.name = 'PaceForge Admin';
      user.password = await bcrypt.hash(adminPassword, await bcrypt.genSalt(10));
      await user.save();
      console.log('Admin updated successfully.');
    } else {
      user = new User({
        name: 'PaceForge Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'ADMIN'
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(adminPassword, salt);
      await user.save();
      console.log('Admin user created successfully!');
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
    }

    mongoose.disconnect();
  } catch (err) {
    console.error('Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
