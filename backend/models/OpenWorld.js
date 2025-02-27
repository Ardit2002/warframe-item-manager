const mongoose = require('mongoose');

const openWorldSchema = new mongoose.Schema({
  name: { type: String, required: true }, // The name of the open world (e.g., Plains of Eidolon)
  activities: {
    fishing: [{ type: String }], // List of fish species
    mining: [{ type: String }], // List of ores
    hunting: [{ type: String }], // List of animals to hunt
  },
});

const OpenWorld = mongoose.model('OpenWorld', openWorldSchema);

module.exports = OpenWorld;
