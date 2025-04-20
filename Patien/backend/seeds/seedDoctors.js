const mongoose = require('mongoose');
const Doctor = require('../models/Doctor'); // Make sure this file exists!

mongoose.connect('mongodb://127.0.0.1:27017/smartcare')
  .then(() => {
    console.log('🟢 Connected to MongoDB');
    return Doctor.insertMany([
      { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', price: 150, location: 'New York' },
      { name: 'Dr. Ahmed Mansour', specialty: 'Dermatology', price: 100, location: 'Cairo' },
      { name: 'Dr. Emma Stone', specialty: 'Pediatrics', price: 120, location: 'London' },
      { name: 'Dr. Youssef Benali', specialty: 'Orthopedics', price: 180, location: 'Tunis' },
      { name: 'Dr. Sofia Rossi', specialty: 'Neurology', price: 200, location: 'Milan' }
    ]);
  })
  .then(() => {
    console.log('✅ Doctors seeded!');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Seeding failed:', err));
