const Subscriber = require("../models/subscribersModel");
const asyncHandler = require("express-async-handler");

// get all products
const getAllSubscribers = asyncHandler(async (req, res) => {
	try {
		const subscribers = await Subscriber.find({});

		res.status(200).json(subscribers);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

//create a product

const createSubscriber = asyncHandler(async (req, res) => {
	try {
		const subscriber = await Subscriber.create(
			req.body
		);
		res.status(200).json(subscriber);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error(error.message);
	}
});

module.exports = {
	getAllSubscribers,
	// getProductById,
	createSubscriber,
	// updateProduct,
	// deleteProduct,
};
