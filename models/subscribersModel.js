const mongoose = require("mongoose");

const subscribersSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: [
				true,
				"please enter a correct email",
			],
		},
	},

	{ timestamps: true }
);

const Subsciber = mongoose.model(
	"Subsciber",
	subscribersSchema
);

module.exports = Subsciber;
