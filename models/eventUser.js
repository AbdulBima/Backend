const mongoose = require("mongoose");

const eventUserSchema = mongoose.Schema(
	{
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String,
      required: true,
    },
    marketing_accept: {
      type: Boolean,
      default: false,
    },
  },
  
	{ timestamps: true }
);

const EventUser = mongoose.model(
	"EventUser",
	eventUserSchema
);

module.exports = EventUser;
