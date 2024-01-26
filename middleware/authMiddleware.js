
const Agent = require('../models/Agent');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
const authenticateUser = (req, res, next) => {
    
    const agentId = req.headers['x-agent-id'];
  
    if (!agentId) {
      return res.status(401).json({ message: 'Missing X-Agent-Id header' });
    }
  
    // Set agentId in request object for further processing
    req.agentId = agentId;
    next();
  };
  const authenticateAgent = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the agent by email
        const agent = await Agent.findOne({ email });

        if (!agent) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const isPasswordValid = await agent.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create the JWT token with the agent's ID and role in the payload
        const token = jwt.sign({ agentId: agent._id, role: agent.role }, process.env.JWT_SECRET_KEY);

        req.agentRole = agent.role;


        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error authenticating agent:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

  // Middleware to authorize regular users
  const authorizeRegular = (req, res, next) => {

    const isRegular = req.agentRole === 'regular';

    if (!isRegular) {
        return res.status(403).json({ message: 'Unauthorized access' });
    }

    next();
};

// Middleware to authorize admin users
const authorizeAdmin = (req, res, next) => {
  
    const isAdmin = req.agentRole === 'admin';

    if (!isAdmin) {
        return res.status(403).json({ message: 'Unauthorized access' });
    }

    next();
}

  const isAdmin = (req, res, next) => {
    // Check if user is logged in and has admin role
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to the next middleware
    } else {
        return res.status(403).json({ message: 'Unauthorized: Only admins can perform this action' });
    }
};
  
  module.exports= { authenticateUser, authorizeRegular, authorizeAdmin,isAdmin,authenticateAgent };
  