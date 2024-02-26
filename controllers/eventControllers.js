const Event = require("../models/eventModel");
const asyncHandler = require("express-async-handler");

// initializePayment


const initializePayment = asyncHandler(async (req, res) =>  {
  const { cart, email, totalAmount } = req.body;

  try {
    const paystackApiUrl = 'https://api.paystack.co/transaction/initialize';
    const paystackSecretKey = process.env.PAYSTAC_KEY;

    const paystackResponse = await axios.post(paystackApiUrl, {
      email,
      totalAmount,
      metadata: { cart },
    },
    {
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        "Content-Type": "application/json",
      },
    }
    );

    if (paystackResponse.data && paystackResponse.data.data.authorization_url) {
      res.status(200).json({ authorization_url: paystackResponse.data.data.authorization_url });
    } else {
      res.status(500).json({ error: 'Failed to initialize Paystack transaction' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
	initializePayment,
  getAllEvents,
	getEventById,
  createEvent,
	// updateProduct,
	// deleteProduct,
};
