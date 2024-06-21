const {
	createLeave,
  getLeaveByCreatorId,
  getLeaveByApproverId,
  approveLeave,
  getAllLeave,
	
} = require("../controllers/leaveControllers");
const Subscriber = require("../models/leaveModel");
const express = require("express");

const router = express.Router();



router.post("/", createLeave);
router.get("/leaveCreator/:id", getLeaveByCreatorId);
router.get("/all", getAllLeave);
router.get("/leaveApprover/:id", getLeaveByApproverId);
router.put("/approve/:leaveId/:approverId", approveLeave);






module.exports = router;
