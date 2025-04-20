
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: String,
  password: String,
  gender: String,
  bloodType: String,
  age: Number,
  weight: Number,
  profileImage: String // optional: for uploaded profile photo
});

module.exports = mongoose.model('User', userSchema);
