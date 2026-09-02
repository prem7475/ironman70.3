const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/events', require('./routes/events'));
app.use('/api/races', require('./routes/events')); // Alias for events
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/wallet', require('./routes/wallet'));
app.use('/api/admin', require('./routes/admin'));

// Basic Health Check
app.get('/', (req, res) => {
  res.send('PACEFORGE API — Operational');
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`PACEFORGE Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('PACEFORGE Server stopped because MongoDB is unavailable.');
    process.exitCode = 1;
  }
};

startServer();
