const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');  // Authentication routes
const userRoutes = require('./routes/user');
const verifyToken = require('./middleware/authMiddleware');  // Middleware for JWT
const Item = require('./models/items');  // Item model
const assassinationBossesRoutes = require("./routes/assassinationBosses");
app.use("/api/assassination-bosses", assassinationBossesRoutes);


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());  // To parse cookies for JWT

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Use authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


// PROTECTED Item Routes (Only logged-in users can access these)
app.post('/api/items', verifyToken, async (req, res) => {  
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/items/:id', verifyToken, async (req, res) => {  
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/items/:id', verifyToken, async (req, res) => {  
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
