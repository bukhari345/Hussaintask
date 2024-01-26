const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
mongoose.set('strictQuery', true);
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;
require('./DB/conn');
app.use(express.json());
app.use('/', express.static(path.join(__dirname, "public",)));
const userRoutes = require('./routes/userRoutes');
const agentRoutes = require('./routes/agentRoutes');
const schedulerRoutes = require('./routes/schedulerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api', userRoutes);
app.use('/api', agentRoutes);
app.use('/api', schedulerRoutes);
app.use('/api', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(PORT, () => { console.log(`Server is successfully running at server ${PORT}`) });

