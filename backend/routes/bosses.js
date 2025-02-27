const express = require('express');
const Boss = require('../models/Boss');
const router = express.Router();

// Fetch bosses for a specific Warframe
router.get('/api/warframe/bosses/:warframe', async (req, res) => {
  try {
    const { warframe } = req.params;
    const bosses = await Boss.find({ warframe });
    res.status(200).json(bosses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bosses', error });
  }
});

// Fetch bosses by planet
router.get('/api/warframe/bosses/planet/:planet', async (req, res) => {
  try {
    const { planet } = req.params;
    const bosses = await Boss.find({ planet });
    res.status(200).json(bosses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bosses', error });
  }
});

module.exports = router;
