const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  price: Number,
  location: String
});

module.exports = mongoose.model('Doctor', doctorSchema);
