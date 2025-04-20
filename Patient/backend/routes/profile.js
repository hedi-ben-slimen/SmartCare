const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET profile info for a user
router.get("/", async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ name: username });
    if (!user) return res.status(404).json(null);

    const { gender, blood, age, weight } = user;
    res.json({ gender, blood, age, weight });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// POST/UPDATE profile info
router.post("/", async (req, res) => {
  const { username, gender, blood, age, weight } = req.body;

  try {
    const updated = await User.findOneAndUpdate(
      { name: username },
      { $set: { gender, blood, age, weight } },
      { upsert: true, new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

module.exports = router;
