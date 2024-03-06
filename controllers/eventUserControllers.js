const EventUser = require("../models/eventUser");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');



//create a eventUser

const createEventUser = asyncHandler(async (req, res) => {
	

	const {
		first_name,
		last_name,
		email, 
		password,
		password_confirmation,
		marketing_accept,
	} = req.body;
	
		try {
			// Check whether the email is registered with findOne
	
			// Hash the password
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);
	
			// Create a new user with the hashed password
			const newUser = new User({
				first_name,
				last_name,
				email,
				password: hashedPassword,
				password_confirmation,
				marketing_accept,
			});


		const eventUser = await EventUser.create(
			newUser
		);
		res.status(200).json(eventUser);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error(error.message);
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
	
};
