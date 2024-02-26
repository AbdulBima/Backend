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




module.exports = {

  getAllEvents,
	getEventById,
  createEvent,
	// updateProduct,
	// deleteProduct,
};
