const Leave = require("../models/leaveModel");
const asyncHandler = require("express-async-handler");

// Create a leave
const createLeave = asyncHandler(async (req, res) => {
  try {
    // Destructure relevant fields from the request body
    const { EmployeeID, ...leaveData } = req.body;

    // Create a new leave document with the provided data
    const leave = await Leave.create({
      ...leaveData,
      EmployeeID,
      status: false,
      createdBy: EmployeeID,
      approvedBy: "not assigned",
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get leave by creator ID
const getLeaveByCreatorId = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.find({ createdBy: id }, '_id TypeOfLeave startdate enddate status');
    res.status(200).json(leave);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get leave by approver ID
const getLeaveByApproverId = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.find({ approvedBy: id });
    res.status(200).json(leave);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

const approveLeave = asyncHandler(async (req, res) => {
  try {
    const { leaveId, approverId } = req.params;

    // Find leave by leave ID
    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Set status to true and approvedBy to approver ID
    leave.status = true;
    leave.approvedBy = approverId;

    // Save the updated leave
    await leave.save();

    res.status(200).json({ message: "Leave approved successfully", leaveId: leave._id });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});


// Get all leave requests
const getAllLeave = asyncHandler(async (req, res) => {
  try {
    const leave = await Leave.find();
    res.status(200).json(leave);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = {
  createLeave,
  getLeaveByCreatorId,
  getLeaveByApproverId,
  approveLeave,
  getAllLeave
};
