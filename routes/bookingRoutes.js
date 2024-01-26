const express = require('express');
const { createBooking, deleteBooking } = require('../controllers/BookingController');
const { authorizeAdmin ,isAdmin} = require('../middleware/authMiddleware');


const router = express.Router();

// Route to create a booking
router.post('/booking', authorizeAdmin,isAdmin,createBooking);

// Route to delete a booking by ID
router.delete('/booking/:id', authorizeAdmin, deleteBooking);

module.exports= router;
