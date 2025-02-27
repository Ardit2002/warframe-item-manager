const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get user data (requires authentication)
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update user progress
router.put('/progress', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.progress = req.body.progress || user.progress;
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add item to wishlist
router.post('/wishlist', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { item } = req.body;
        if (!item) return res.status(400).json({ message: "Item is required" });

        if (!user.wishlist.includes(item)) {
            user.wishlist.push(item);
            await user.save();
        }

        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Remove item from wishlist
router.delete('/wishlist/:item', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.wishlist = user.wishlist.filter(i => i !== req.params.item);
        await user.save();

        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
