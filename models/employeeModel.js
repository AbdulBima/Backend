const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
	{
    employeeId: {
      type: String,
      required: true,
      unique: true // Assuming employee IDs are unique
    },
    password: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      required: true
    },
  },
  
	{ timestamps: true }
);

const Employee = mongoose.model(
	"Employee",
	employeeSchema
);

module.exports = Employee;
