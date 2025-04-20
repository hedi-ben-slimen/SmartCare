const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// GET profile info for a user
router.get('/', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const user = await User.findOne({ name: username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { gender, bloodType, age, weight } = user;
    res.status(200).json({ gender, bloodType, age, weight });
  } catch (err) {
    console.error('❌ Error fetching profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// POST/UPDATE profile info
router.post('/', async (req, res) => {
  const { username, gender, bloodType, age, weight } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const updated = await User.findOneAndUpdate(
      { name: username },
      { $set: { gender, bloodType, age, weight } },
      { upsert: true, new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error('❌ Error updating profile:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ✅ Upload profile picture (fix)
router.post('/upload-profile-pic', upload.single('profilePic'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const imagePath = `/uploads/${req.file.filename}`;
  res.json({ path: imagePath });
});

module.exports = router;
