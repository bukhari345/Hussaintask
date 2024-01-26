const express = require('express');
const { getAllAgents,createAdminAgent,createRegularAgent} = require('../controllers/AgentController');
const { authorizeAdmin,authenticateAgent, isAdmin } = require('../middleware/authMiddleware');


const router = express.Router();

// Route to get all agents
router.get('/agents', getAllAgents);
// Route to create regular agent
router.post('/admin', createAdminAgent);

// Route to create regular agent
router.post('/regular',createRegularAgent);
//route for login the agent 
router.post('/login',authenticateAgent);
module.exports=router;
