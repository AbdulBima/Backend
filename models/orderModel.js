const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
    orderer: { type: String, required: true },
    order: {
      type: [String], 
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
