const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/verify-token', (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Token verification successful
    res.status(200).json({ message: 'Token verified', userId: decoded.userId, email: decoded.email });
  } catch (error) {
    // Handle token verification errors
    if (error.name === 'TokenExpiredError') {
      // Clear cookie and return unauthorized
      res.clearCookie('token');
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    // Other token verification errors
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
