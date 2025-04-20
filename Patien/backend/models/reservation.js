const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  doctor: String,
  specialty: String,
  patient: String,
  date: String,
  time: String,
  method: String,
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Reservation', reservationSchema);
