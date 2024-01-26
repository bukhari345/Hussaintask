const User = require('../models/User');

const createUser = async (req, res) => {
  try {
      // Extract agent ID from the authenticated user session
      const agentId = req.user.agentId;

      // Create user associated with the agent ID
      const user = new User({
          name: req.body.name,
          email: req.body.email,
          agent: agentId
      });

      await user.save();

      res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Failed to create user' });
  }
};
// Controller method to get all users for the current agent
const getAllUsers = async (req, res) => {
  try {
    // Assuming the agent ID is extracted from the request headers
    const agentId = req.agentId;

    // Fetch users belonging to the current agent
    const users = await User.find({ agent: agentId });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllUsers,createUser };
