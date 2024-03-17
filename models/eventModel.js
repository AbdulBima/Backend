const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
	{
    eventName: { type: String, required: true },
  eventCreator: { type: mongoose.Schema.Types.ObjectId, ref: "eventusers" , required: true},
  dateOfEvent: { type: String, required: true }, // You might want to use Date type here if storing as a date
  location: { type: String, required: true },
  ticket_price: { type: Number, required: true },
  quantity_of_ticket: { type: Number, required: true },
  quantity_of_ticket_purchased: { type: Number, required: true },
  description: { type: String, required: true },

  },
  
	{ timestamps: true }
);

const Event = mongoose.model(
	"Event",
	eventSchema
);

module.exports = Event;
