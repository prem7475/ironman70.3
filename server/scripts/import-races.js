const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Event = require('../models/Event');

const requiredCategories = new Set(['Marathon', 'Cycling', 'Swimming', 'Triathlon', 'Duathlon', 'IRONMAN', 'HYROX', 'Devils Circuit']);
const supportedCities = new Set(['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune']);
const file = process.argv[2] || 'data/verified-races.json';

const races = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
if (!Array.isArray(races) || races.some(race => !requiredCategories.has(race.category) || !supportedCities.has(race.location) || !race.sourceVerified || !race.sourceUrl || !race.registrationUrl || Number.isNaN(new Date(race.date).getTime()))) {
  console.error('Every race must use a supported city/category, valid date, and include verified official source and registration URLs.');
  process.exit(1);
}

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Event.bulkWrite(races.map(race => ({ updateOne: { filter: { slug: race.slug }, update: { $set: race }, upsert: true } })));
  await mongoose.disconnect();
  console.log(`Imported ${races.length} verified races.`);
}).catch(error => {
  console.error(error.message);
  process.exit(1);
});