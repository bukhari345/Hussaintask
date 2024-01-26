const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent',
      required: true
    },
    start_at: {
      type: Date,
      required: true
    },
    finish_at: {
      type: Date,
      required: true
    }
  });
  

  const Booking = mongoose.model('Booking', BookingSchema);
  module.exports=Booking;
  