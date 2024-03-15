const EventUser = require("../models/eventUser");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



//create a verifyToken
// const verifyToken = asyncHandler(async (req, res) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, secretKey);

//     // Token verification successful, attach userId to request object and return success response
//     req.userId = decoded.userId;
//     return res.status(200).json({ message: 'Token verified', userId: decoded.userId, email: decoded.email });
//   } catch (error) {
//     // Handle token verification errors
//     if (error.name === 'TokenExpiredError') {
//       // Clear cookie and return unauthorized
//       res.clearCookie('token');
//       return res.status(401).json({ message: 'Session expired. Please log in again.' });
//     }
//     // Other token verification errors
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// });


//create a eventUser
const createEventUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    marketing_accept,
  } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await EventUser.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new EventUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      marketing_accept,
    });

    const eventUser = await newUser.save();
    res.status(201).json(eventUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//login eventUser

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const secretKey = 'yourSecretKey';

  try {
    // Check if the user with the provided email exists
    const user = await EventUser.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Cannot find user ' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'password incorrect' });
    }

    // Passwords match, so you can proceed with user authentication
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({
    userId: user._id,
    email: user.email,
  }, secretKey, { expiresIn: '1h' });

  // Set token as cookie
  res.cookie('token', token, { httpOnly: true}); // Expires in 1 hour
  res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//get all eventUsers
const getAllEventsUsers = asyncHandler(async (req, res) => {
	try {
		const eventUsers = await EventUser.find({});

		res.status(200).json(eventUsers);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

//get eventUser by id

const getEventUserById = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const eventUser = await EventUser.findById(id);

		res.status(200).json(eventUser);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});






module.exports = {

  getAllEventsUsers,
	getEventUserById,
	createEventUser,
  loginUser,
  // verifyToken,
	
};
