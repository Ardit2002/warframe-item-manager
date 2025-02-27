const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch live data about drops, farming locations, or anything you need from Tennotools API or other APIs
router.get('/live-drops', async (req, res) => {
    try {
        // Example API call to fetch drop data from Tennotools
        const response = await axios.get('https://api.tennotools.com/v1/drops'); // Adjust the endpoint as necessary
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching live data from Tennotools:', error);
        res.status(500).json({ message: 'Error fetching live data' });
    }
});

router.get('/bosses', async (req, res) => {
    try {
        // Example API call to fetch boss farming data from Tennotools or Warframe Wiki
        const response = await axios.get('https://api.tennotools.com/v1/bosses'); // Replace with actual endpoint
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching boss data from Tennotools:', error);
        res.status(500).json({ message: 'Error fetching boss data' });
    }
});

module.exports = router;
