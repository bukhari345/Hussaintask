const Booking = require('../models/Booking');


// Controller method to create a booking
const createBooking = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { userId, agentId, startAt, finishAt } = req.body;

    // Create a new booking
    const booking = new Booking({
      user: userId,
      agent: agentId,
      start_at: startAt,
      finish_at: finishAt
    });

    // Save the booking to the database
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller method to delete a booking by ID
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking by ID and delete it
    await Booking.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createBooking, deleteBooking };

