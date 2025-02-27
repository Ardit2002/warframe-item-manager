const mongoose = require('mongoose');

const bossSchema = new mongoose.Schema({
  warframe: { type: String, required: true }, // The Warframe associated with the boss
  bossName: { type: String, required: true }, // The name of the boss
  planet: { type: String, required: true }, // The planet where the boss can be found
  location: { type: String, required: true }, // The mission or area the boss can be found in
  dropChances: {
    common: { type: String }, // Example: "30%"
    uncommon: { type: String },
    rare: { type: String },
  },
});

const Boss = mongoose.model('Boss', bossSchema);

module.exports = Boss;
