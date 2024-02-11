const Reader = require("../models/readerModel");
const asyncHandler = require("express-async-handler");

// get all products
const getAllReaders = asyncHandler(async (req, res) => {
	try {
		const readers = await Reader.find({});

		res.status(200).json(readers);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

//create a product

const createReader = asyncHandler(async (req, res) => {
	try {
		const reader = await Reader.create(req.body);
		res.status(200).json(reader);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error(error.message);
	}
});

module.exports = {
	getAllReaders,
	// getProductById,
	createReader,
	// updateProduct,
	// deleteProduct,
};
