const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();

// ✅ MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/smartcare')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Register Route
app.post('/register', async (req, res) => {
  const { name, email, dob, password } = req.body;
  console.log('📥 Received registration data:', req.body);

  try {
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) return res.send('⚠️ Email is already registered.');

    const user = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      dob: dob.trim(),
      password: password.trim()
    });

    await user.save();
    console.log('✅ User registered successfully:', user);
    res.redirect('/login.html');
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).send(`❌ Registration error: ${err.message}`);
  }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
  let { username, email, password } = req.body;

  username = username.trim();
  email = email.trim().toLowerCase();
  password = password.trim();

  try {
    const user = await User.findOne({
      name: new RegExp(`^${username}$`, 'i'),
      email,
      password
    });

    if (user) {
      console.log('✅ Login successful:', user.name);
      res.redirect(`/main.html?name=${encodeURIComponent(user.name)}`);
    } else {
      res.send(`
        <div style="text-align:center; font-family:sans-serif; margin-top: 100px;">
          <h2 style="color:#d9534f;">❌ Account not found</h2>
          <p>You may have entered incorrect info or don't have an account.</p>
          <a href="/register.html" style="color:green; font-weight:bold;">Create an account</a>
        </div>
      `);
    }
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).send(`❌ Server error: ${err.message}`);
  }
});

// ✅ Redirect root URL to welcome.html
app.get('/', (req, res) => {
    res.redirect('/welcome.html');
  });
  
  // ✅ Start server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
  