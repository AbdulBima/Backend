const mongoose = require("mongoose");

const minnaSchema = mongoose.Schema(
	{
    ownersName: { type: String, required: true },
    businessName: { type: String, required: true },
    businessInfo: { type: String, required: true },
    cacNumber: { type: String, required: true },
    category: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  
	{ timestamps: true }
);

const Minna = mongoose.model(
	"Minna",
	minnaSchema
);
 
module.exports = Minna;
