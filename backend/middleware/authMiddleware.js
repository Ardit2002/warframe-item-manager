// /backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated by verifying the JWT
const verifyToken = (req, res, next) => {
  // Get token from headers (usually passed as Authorization: Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;  // Store user info in request object for further use
    next();  // Proceed to next middleware or route handler
  });
};

module.exports = verifyToken;
