const express = require('express');
const { getScheduler } = require('../controllers/SchedulerController');


const router = express.Router();

// Placeholder route for scheduler
router.get('/scheduler', getScheduler);

module.exports= router;
