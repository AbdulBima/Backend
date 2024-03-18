const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");



//create a order

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


const getOrdersForAnEvent = asyncHandler(async (req, res) => {
	const {eventcreator, eventId} = req.params;
	console.log(eventcreator, eventId)
  // const eventName = req.params.eventName;
	try {
		const orders = await Order.find({});

		const filteredOrders = orders.map(order => ({
      ...order.toObject(),
      order: order.order.filter(event => event.eventCreator === eventcreator && event._id === eventId),
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

const getTicketCountForEvent = async (req, res) => {
  const { id } = req.params;
  try {

		comsole.log(id);
    // Find all orders
    const orders = await Order.find({});

    // Initialize total tickets purchased
    let totalTicketsPurchased = 0;

    // Iterate through each order
    orders.forEach(order => {
      // Find the event with the specified ID in the order's 'order' array
      const event = order.order.find(event => event._id.toString() === id);
      
      // If the event is found, add its 'quantity_of_ticket_purchased' to the total
      if (event) {
        totalTicketsPurchased += event.quantity_of_ticket_purchased;
      }
    });

    res.json({ totalTicketsPurchased });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
	
  getAllOrders,
	getOrderById,
  createOrder,
	getOrdersForAnEvent,
	getTicketCountForEvent,
	// deleteProduct,
};
