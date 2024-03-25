const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Import cookie-parser

// Use cookie-parser middleware
router.use(cookieParser());


router.post('/verify-token', (req, res) => {
  try {
    const token = req.cookies.token;
    const secretKey = 'yourSecretKey';


    if (!token) {
      console.log('no token found');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify token
    const decoded = jwt.verify(token, secretKey);

    const userId = decoded.userId;

    // Token verification successful
    res.status(200).json({ userId: userId, message: 'Token verified' });
  } catch (error) {
    console.log(error);
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
