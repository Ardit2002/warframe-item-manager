const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('./models/User');
const Item = require('./models/Item');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/warframe_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes for Authentication

// Register a new user
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});

// Login a user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
});

// Middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }
  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// CRUD operations for items
app.get('/api/items', authenticate, async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});

app.post('/api/items', authenticate, async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newItem = new Item({ name, description, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error });
  }
});

app.put('/api/items/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { name, description, price }, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
});

app.delete('/api/items/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
});

// Warframe API Routes

// Fetch Boss Data from Warframe API (Using TennoTools or Warframe Wiki)
app.get('/api/warframe/bosses', async (req, res) => {
  try {
    const response = await axios.get('https://api.warframe.market/v1/items/bosses'); // Replace with actual boss API endpoint
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching boss data', error });
  }
});

// Fetch live drops data from Warframe API
app.get('/api/warframe/live-drops', async (req, res) => {
  try {
    const response = await axios.get('https://api.warframe.market/v1/items/live-drops'); // Replace with actual live drop API endpoint
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching live drops data', error });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
