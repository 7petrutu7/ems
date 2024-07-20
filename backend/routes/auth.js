const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Funcție pentru a obține data curentă în fusul orar local
function getLocalDate() {
  const now = new Date();
  now.setHours(now.getHours() + 3); // Ajustează fusul orar aici, de exemplu pentru UTC+3
  return now;
}

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword, date: getLocalDate() });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
