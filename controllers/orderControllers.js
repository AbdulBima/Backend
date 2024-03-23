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

const getOrdersByOrdererId = asyncHandler(async (req, res) => {
  const { ordererId } = req.params;

  try {
    const orders = await Order.find({ ordererId });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Orders not found for this user' });
    }
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const getOrdersForAnEvent = asyncHandler(async (req, res) => {
	const { eventcreator, eventId } = req.params;
	console.log(eventcreator, eventId)
	try {
			const orders = await Order.find({
					"order": {
							$elemMatch: {
									"eventCreator": eventcreator,
									"_id": eventId
							}
					}
			});

			const matchedOrders = orders.filter(order =>
        order.order.some(event => event._id === eventId)
    );

    // Map matched orders to include ordererId and ordererEmail
    const responseObject = matchedOrders.map(order => ({
        orderId: order._id,
        ordererEmail: order.ordererEmail,
        matchedOrder: order.order.find(event => event._id === eventId)
    }));

    // Sending the response as JSON
    res.json(responseObject);
	} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
	}
});





const getTicketCountForEvent = async (req, res) => {
  const { id } = req.params;
  try {
    // Find all orders
    const orders = await Order.find({});

    // Initialize total tickets purchased
    let totalTicketsPurchased = 0;

    // Iterate through each order
    orders.forEach(order => {
      // Iterate through each event in the order
      order.order.forEach(event => {
        // Check if the event ID matches the specified ID
        if (event._id.toString() === id) {
					console.log(event._id);
          // If it matches, add its quantity_of_ticket_purchased to the total
          totalTicketsPurchased += event.quantity_of_ticket_purchased;
        }
      });
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
	getOrdersByOrdererId,
	// deleteProduct,
};
