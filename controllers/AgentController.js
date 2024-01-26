const Agent = require('../models/Agent');
const bcrypt = require('bcrypt');
const createAdminAgent = async (req, res) => {
  try {
      // Check if an admin agent already exists
      const existingAdminAgent = await Agent.findOne({ role: 'admin' });
      if (existingAdminAgent) {
          return res.status(400).json({ message: 'Admin agent already exists' });
      }

      // Extract data from request body
      const { name, email, password } = req.body;

      
      const hashedPassword = await bcrypt.hash(password, 10);

      
      const adminAgentData = {
          name,
          email,
          password: hashedPassword,
          role: 'admin'
      };

      // Save the admin agent to the database
      const adminAgent = new Agent(adminAgentData);
      await adminAgent.save();

      // Respond with success message
      res.status(201).json({ message: 'Admin agent created successfully' });
  } catch (error) {
      console.error('Error creating admin agent:', error);
      res.status(500).json({ message: 'Failed to create admin agent' });
  }
};

// Controller method to create a regular agent
const createRegularAgent = async (req, res) => {
  try {
      // Extract data from request body
      const { name, email, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the regular agent
      const regularAgentData = {
          name,
          email,
          password: hashedPassword,
          role: 'regular'
      };

      // Save the regular agent to the database
      const regularAgent = new Agent(regularAgentData);
      await regularAgent.save();

      // Respond with success message
      res.status(201).json({ message: 'Regular agent created successfully' });
  } catch (error) {
      console.error('Error creating regular agent:', error);
      res.status(500).json({ message: 'Failed to create regular agent' });
  }
}

// Controller method to get all agents
const getAllAgents = async (req, res) => {
  try {
      // Fetch all agents from the database
      const agents = await Agent.find();

      // Respond with the list of agents
      res.json({ agents });
  } catch (error) {
      console.error('Error fetching agents:', error);
      res.status(500).json({ message: 'Failed to fetch agents' });
  }
};

module.exports = { getAllAgents,createAdminAgent,createRegularAgent };

