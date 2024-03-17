const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: { type: String, required: true },
  eventName: { type: String, required: true },
  eventCreator: { type: mongoose.Schema.Types.ObjectId, ref: "eventusers" , required: true},
  dateOfEvent: { type: String, required: true },
  location: { type: String, required: true },
  ticket_price: { type: Number, required: true },
  quantity_of_ticket: { type: Number, required: true },
  quantity_of_ticket_purchased: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  __v: { type: Number, required: true },
});

const orderSchema = mongoose.Schema(
  {
    ordererId : { type: mongoose.Schema.Types.ObjectId, ref: "eventusers" , required: true},
    ordererEmail: { type: String, required: true },
    orderAmount: { type: Number, required: true },
    order: {
      type: [productSchema],  // Change the type to an array of the product schema
      default: [],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model(
	"Order",
	orderSchema
);

module.exports = Order;
