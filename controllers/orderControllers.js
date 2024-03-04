const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");



//create a event

const createOrder = asyncHandler(async (req, res) => {
	try {
		const order = await Order.create(
			req.body
		);
		res.status(200).json(order);
	} catch (error) {
		console.log(error.message);
		res.status(500);
		throw new Error(error.message);
	}
});


//get all orders
const getAllOrders = asyncHandler(async (req, res) => {
	try {
		const orders = await Order.find({});

		res.status(200).json(orders);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

//get order by id

const getOrderById = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const order = await Order.findById(id);

		res.status(200).json(order);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});


const getOrdersForEventCreator = asyncHandler(async (req, res) => {
	const {eventCreator, eventName} = req.params;
	console.log(eventCreator, eventName)
  // const eventName = req.params.eventName;
	try {
		const orders = await Order.find({});

		const filteredOrders = orders.map(order => ({
      ...order.toObject(),
      order: order.order.filter(event => event.eventCreator === eventCreator && event.eventName === eventName),
    }));

		   // Filter out orders without matching events
			 const validOrders = filteredOrders.filter(order => order.order.length > 0);

			 // You can send the validOrders as the response or process them further
			 res.json(validOrders);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});




module.exports = {
	
  getAllOrders,
	getOrderById,
  createOrder,
	getOrdersForEventCreator,
	// updateProduct,
	// deleteProduct,
};
