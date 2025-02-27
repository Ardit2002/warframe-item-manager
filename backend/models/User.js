const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  progress: {
    type: Array,  // Track the missions/items collected, etc.
    default: [],
  },
  wishlist: {
    type: Array,  // Store wishlist items
    default: [],
  },
});

module.exports = mongoose.model('User', userSchema);
