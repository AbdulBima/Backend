const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "please enter your name"],
		},

		email: {
			type: String,
			required: [
				true,
				"please enter a correct email",
			],
		},

		message: {
			type: String,
			required: [
				true,
				"please enter a message email",
			],
		},
	},

	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
