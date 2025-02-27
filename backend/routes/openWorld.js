const express = require('express');
const OpenWorld = require('../models/OpenWorld');
const router = express.Router();

// Fetch open world activities
router.get('/api/warframe/open-worlds', async (req, res) => {
  try {
    const openWorlds = await OpenWorld.find();
    res.status(200).json(openWorlds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching open world data', error });
  }
});

module.exports = router;
