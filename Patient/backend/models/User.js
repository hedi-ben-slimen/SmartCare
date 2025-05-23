const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: String,
  password: String,
  gender: String,
  blood: String,
  age: String,
  weight: String,
});

module.exports = mongoose.model('User', userSchema);
