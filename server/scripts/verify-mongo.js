const mongoose = require('mongoose');
require('dotenv').config();

const testMongo = async () => {
  console.log('Testing MongoDB connection...');
  console.log('URI:', process.env.MONGODB_URI);
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`SUCCESS: Connected to MongoDB Atlas host: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);

    const User = require('../models/User');
    const userCount = await User.countDocuments();
    console.log(`Current Total Users in MongoDB: ${userCount}`);

    const Event = require('../models/Event');
    const eventCount = await Event.countDocuments();
    console.log(`Current Total Events in MongoDB: ${eventCount}`);

    const Ticket = require('../models/Ticket');
    const ticketCount = await Ticket.countDocuments();
    console.log(`Current Total Registrations in MongoDB: ${ticketCount}`);

    process.exit(0);
  } catch (err) {
    console.error('FAILED: MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

testMongo();
