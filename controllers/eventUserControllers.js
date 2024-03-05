const EventUser = require("../models/eventUser");
const asyncHandler = require("express-async-handler");



//create a eventUser

const createEventUser = asyncHandler(async (req, res) => {
	try {
		const eventUser = await EventUser.create(
			req.body
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
