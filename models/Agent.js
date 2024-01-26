// Agent.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AgentSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String
});

// Method to compare password
AgentSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Agent = mongoose.model('Agent', AgentSchema);

module.exports = Agent;
