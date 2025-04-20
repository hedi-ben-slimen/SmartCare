const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Doctor = require('./backend/models/' + 'Doctors-auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from Doctor/public
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smartcare', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Doctor Login Route
app.post('/api/doctor-auth/login', async (req, res) => {
  const { username, Id, email, password, speciality } = req.body;

  console.log('🔐 Login attempt with:', req.body);

  if (!username || !Id || !email || !password || !speciality) {
    return res.status(400).json({ error: '❌ All fields are required.' });
  }

  try {
    const query = {
      username: new RegExp(`^${username}$`, 'i'),
      Id: Id.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      speciality: new RegExp(`^${speciality}$`, 'i')
    };

    console.log('🔍 Searching for doctor:', query);

    const doctor = await Doctor.findOne(query);

    if (!doctor) {
      return res.status(401).json({ error: '❌ Invalid credentials. Doctor not found.' });
    }

    res.status(200).json({
      message: `✅ Welcome Dr. ${doctor.username}`,
      redirect: '/main.html',
      doctor
    });

  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ error: '❌ Server error. Try again later.' });
  }
});

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

// Start
app.listen(PORT, () => {
  console.log(`🚀 Doctor server running at http://localhost:${PORT}`);
});
