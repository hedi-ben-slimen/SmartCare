// Doctor/backend/routes/doctorAuth.js

const express = require('express');
const router = express.Router();

// Example route for doctor login (customize as needed)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    res.json({ message: `Welcome Dr. ${username}` });
  } else {
    res.status(400).json({ error: 'Missing credentials' });
  }
});

module.exports = router;
