const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Path to the AssassinationBosses directory
const bossesDir = path.join(__dirname, "../AssassinationBosses");

// Get all assassination bosses
router.get("/", async (req, res) => {
  try {
    const bossFolders = fs.readdirSync(bossesDir); // Get all folders (boss names)
    const bossesData = [];

    bossFolders.forEach((bossName) => {
      const bossPath = path.join(bossesDir, bossName);
      if (fs.lstatSync(bossPath).isDirectory()) {
        const warframeFiles = fs.readdirSync(bossPath); // Get Warframe JSON files

        warframeFiles.forEach((warframeFile) => {
          const filePath = path.join(bossPath, warframeFile);
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

          bossesData.push({
            boss: bossName,
            warframe: warframeFile.replace(".json", ""),
            data: data,
          });
        });
      }
    });

    res.json(bossesData);
  } catch (error) {
    console.error("Error fetching bosses:", error);
    res.status(500).json({ error: "Failed to load assassination bosses" });
  }
});

module.exports = router;
