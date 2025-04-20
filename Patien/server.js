const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const User = require('./backend/models/User');
const Reservation = require('./backend/models/Reservation');
const profileRoutes = require('./backend/routes/profile');
const doctorRoutes = require('./backend/routes/doctors');

const app = express();

// 📦 MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/smartcare')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// 🧰 Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 📤 Multer upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'public/uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// 🔐 Routes
app.use('/api/profile', profileRoutes);
app.use('/api/doctors', doctorRoutes);

// 🔽 Upload profile picture
app.post('/api/upload-profile-pic', upload.single('profilePic'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
  res.json({ path: `/uploads/${req.file.filename}` });
});

// 👤 Patient registration
app.post('/register', async (req, res) => {
  const { name, email, dob, password } = req.body;
  try {
    const exists = await User.findOne({ email: email.trim().toLowerCase() });
    if (exists) return res.send('⚠️ Email already registered.');
    const user = new User({ name, email, dob, password });
    await user.save();
    res.redirect('/login.html');
  } catch (err) {
    res.status(500).send(`❌ Registration error: ${err.message}`);
  }
});

// 🔐 Login
app.post('/login', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({
      name: new RegExp(`^${username}$`, 'i'),
      email: email.trim().toLowerCase(),
      password: password.trim()
    });
    if (user) {
      res.redirect(`/main.html?name=${encodeURIComponent(user.name)}`);
    } else {
      res.send(`
        <div style="text-align:center;">
          <h2>❌ Account not found</h2>
          <p><a href="/register.html">Sign up</a> instead.</p>
        </div>
      `);
    }
  } catch (err) {
    res.status(500).send(`❌ Login error: ${err.message}`);
  }
});

// 📥 Save reservation
app.post('/api/reservations', async (req, res) => {
  try {
    const reservation = new Reservation({ ...req.body, status: 'pending' });
    await reservation.save();
    res.status(201).json({ message: 'Reservation saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📤 Get reservations for doctor
app.get('/api/reservations/:doctor', async (req, res) => {
  try {
    const doctorName = req.params.doctor;
    const reservations = await Reservation.find({ doctor: doctorName, status: 'pending' });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Accept reservation
app.post('/api/reservations/:id/confirm', async (req, res) => {
  await Reservation.findByIdAndUpdate(req.params.id, { status: 'confirmed' });
  res.json({ message: 'Confirmed' });
});

// ❌ Reject reservation
app.post('/api/reservations/:id/reject', async (req, res) => {
  await Reservation.findByIdAndUpdate(req.params.id, { status: 'rejected' });
  res.json({ message: 'Rejected' });
});

// 🏠 Default route
app.get('/', (req, res) => {
  res.redirect('/loading.html');
});

// 🚀 Start server
app.listen(3000, () => console.log('🚀 Patient Server running at http://localhost:3000'));
