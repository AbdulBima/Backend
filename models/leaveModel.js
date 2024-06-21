const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({
  EmployeeID: { type: String, required: true },
  TypeOfLeave: { type: String, required: true },
  startdate: { type: String, required: true },
  enddate: { type: String, required: true },
  totalnumberofdays: { type: String, required: true },
  reasonforleave: { type: String, required: true },
  status: { type: Boolean, required: true },
  approvedBy: { type: String, required: true },
  createdBy: { type: String, required: true }
}, { timestamps: true });

const Leave = mongoose.model(
	"Leave",
	leaveSchema
);

module.exports = Leave;
