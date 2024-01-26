const express = require('express');
const { getAllUsers,createUser } = require('../controllers/UserController');
const { authorizeRegular, authenticateAgent} = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/users',createUser);
router.get('/users',authorizeRegular, getAllUsers);

module.exports = router;
