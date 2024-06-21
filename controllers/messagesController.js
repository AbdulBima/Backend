const Message = require("../models/messageModel");

const asyncHandler = require("express-async-handler");

//create a message

const createMessage = asyncHandler(async (req, res) => {
	try {
		const message = await Message.create(req.body);
		res.status(200).json(message);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error(error.message);
	}
});

module.exports = {
	createMessage,
};
