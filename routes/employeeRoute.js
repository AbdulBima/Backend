const {  getAllEmployees,
	getEmployeeById,
	createEmployee,
	loginEmployee,
	// logoutEmployee,
  updateEmployeeAdminStatus,
	
} = require("../controllers/employeeControllers");
const EventUser = require("../models/employeeModel");
const express = require("express");

const router = express.Router();
const cookieParser = require('cookie-parser'); // Import cookie-parser

// Use cookie-parser middleware
router.use(cookieParser());


router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.post("/login", loginEmployee);
// router.post("/logout", logoutEmployee); 
router.put("/:changeeId/admin/:changerId", updateEmployeeAdminStatus);








module.exports = router;

