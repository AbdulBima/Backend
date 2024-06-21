const EventUser = require("../models/eventUser");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY;


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
		const existingUser = await EventUser.findOne({
			email,
		});

		if (existingUser) {
			return res
				.status(400)
				.json({
					error: "Email is already registered",
				});
		}

		// Hash the password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(
			password,
			saltRounds
		);

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
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
});

//login eventUser

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	

	try {
		// Check if the user with the provided email exists
		const user = await EventUser.findOne({ email });

		if (!user) {
			return res
				.status(401)
				.json({ error: "Cannot find user " });
		}

		// Compare the provided password with the stored hashed password
		const isPasswordMatch = await bcrypt.compare(
			password,
			user.password
		);

		if (!isPasswordMatch) {
			return res
				.status(401)
				.json({ error: "Password incorrect" });
		}

		// Passwords match, so you can proceed with user authentication

		// Generate JWT token
		const token = jwt.sign(
			{
				userId: user._id,
				email: user.email,
			},
			JWT_KEY,
			{ expiresIn: "1h" }
		);

		// Send the token back to the client
		res.json({
			token: token,
			message: "Login successful",
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
	try {
		res.cookie("token", "", {
			expires: new Date(0),
			httpOnly: true,
			secure: true,
			sameSite: "None",
		});
		res.json({ message: "Logout successful" });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Internal Server Error",
		});
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
	logoutUser,
	// verifyToken,
};
