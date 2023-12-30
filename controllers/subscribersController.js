const Subscriber = require("../models/subscribersModel");
const asyncHandler = require("express-async-handler");

// get all products
const getAllSubscribers = asyncHandler(async (req, res) => {
	try {
		const subscribers = await Product.find({});

		res.status(200).json(subscribers);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// //get product by id

// const getProductById = asyncHandler(async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const product = await Product.findById(id);

// 		res.status(200).json(product);
// 	} catch (error) {
// 		res.status(500);
// 		throw new Error(error.message);
// 	}
// });

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

//update product

// const updateProduct = asyncHandler(async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const product = await Product.findByIdAndUpdate(
// 			id,
// 			req.body
// 		);
// 		//cant find a user with this Id in databse
// 		if (!product) {
// 			return res.status(404).json({
// 				message: `cannot find any product with ID
//           ${id}`,
// 			});
// 		}
// 		const updated = await Product.findById(id);
// 		res.status(200).json(updated);
// 	} catch (error) {
// 		res.status(500);
// 		throw new Error(error.message);
// 	}
// });

// //delete a product by id

// const deleteProduct = asyncHandler(async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const product = await Product.findByIdAndDelete(id);
// 		//cant find a user with this Id in databse
// 		if (!product) {
// 			res.status(404);
// 			throw new Error(`cannot find any product with ID
// 			${id}`);
// 		}

// 		res.status(200).json(product);
// 	} catch (error) {
// 		res.status(500);
// 		throw new Error(error.message);
// 	}
// });

module.exports = {
	getAllSubscribers,
	// getProductById,
	createSubscriber,
	// updateProduct,
	// deleteProduct,
};
