const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./models/User');
const profileRoutes = require('./routes/profile');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/smartcare')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/profile', profileRoutes);

app.post('/register', async (req, res) => {
  const { name, email, dob, password } = req.body;
  try {
    const exists = await User.findOne({ email: email.trim().toLowerCase() });
    if (exists) return res.send('⚠️ Email is already registered.');
    const user = new User({ name, email, dob, password });
    await user.save();
    res.redirect('/login.html');
  } catch (err) {
    res.status(500).send(`❌ Registration error: ${err.message}`);
  }
});

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
          <p>Please check your credentials or <a href="/register.html">Sign up</a></p>
        </div>
      `);
    }
  } catch (err) {
    res.status(500).send(`❌ Login error: ${err.message}`);
  }
});

app.get('/', (req, res) => {
  res.redirect('/loading.html');
});

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));

