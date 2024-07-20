const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth');
const adRoutes = require('./routes/ads');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// MySQL connection
const db = require('./config/db');

// Models
const User = require('./models/User');
const Ad = require('./models/Ad');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ads', adRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
