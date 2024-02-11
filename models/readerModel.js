const mongoose = require("mongoose");

const readersSchema = mongoose.Schema(
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

const Reader = mongoose.model("Reader", readersSchema);

module.exports = Reader;
