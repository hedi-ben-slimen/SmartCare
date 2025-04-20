const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  username: String,
  Id: String,
  email: String,
  password: String,
  speciality: String
}, { collection: 'Doctors-auth' }); // ✔️ You're forcing it correctly

module.exports = mongoose.model('Doctor', doctorSchema);
