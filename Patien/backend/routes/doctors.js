const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// GET /api/doctors?specialty=Cardiology
router.get('/', async (req, res) => {
  const { specialty } = req.query;

  try {
    const query = specialty ? { specialty } : {};
    const doctors = await Doctor.find(query);
    res.status(200).json(doctors);
  } catch (err) {
    console.error('❌ Error fetching doctors:', err);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// POST /api/doctors
router.post('/', async (req, res) => {
  const { name, specialty, price, location } = req.body;

  try {
    const newDoctor = new Doctor({ name, specialty, price, location });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    console.error('❌ Error creating doctor:', err);
    res.status(400).json({ error: 'Failed to create doctor' });
  }
});

module.exports = router;
