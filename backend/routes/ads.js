const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');
const auth = require('../middleware/auth');

// Obține toate anunțurile
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find().populate('user', 'username');
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creează un nou anunț
router.post('/', auth, async (req, res) => {
  const { title, description, price } = req.body;
  const newAd = new Ad({ title, description, price, user: req.user.id });

  try {
    const savedAd = await newAd.save();
    res.status(201).json(savedAd);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obține un anunț specific
router.get('/:id', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('user', 'username');
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
