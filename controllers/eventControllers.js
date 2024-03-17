const Event = require("../models/eventModel");
const asyncHandler = require("express-async-handler");



//create a event

const createEvent = asyncHandler(async (req, res) => {
	try {
		const event = await Event.create(
			req.body
		);
		res.status(200).json(event);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error(error.message);
	}
});


//get all events
const getAllEvents = asyncHandler(async (req, res) => {
	try {
		const events = await Event.find({});

		res.status(200).json(events);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

//get event by id

const getEventById = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const event = await Event.findById(id);

		res.status(200).json(event);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// Express route to fetch events by eventCreator

const getEventCreator = asyncHandler(async (req, res) => {

	const { eventCreator } = req.params;
	
			try {
			// Use Mongoose to find events with the specified eventCreator
			const events = await Event.find({ "eventCreator" : eventCreator });
	
			// Return the events
			res.json(events);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});




module.exports = {

  getAllEvents,
	getEventById,
	createEvent,
	getEventCreator,
	// updateProduct,
	// deleteProduct,
};
