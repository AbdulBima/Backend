const {  getAllEventsUsers,
	getEventUserById,
	createEventUser,
	loginUser,
	logoutUser,
	
} = require("../controllers/eventUserControllers");
const EventUser = require("../models/eventUser");
const express = require("express");

const router = express.Router();
const cookieParser = require('cookie-parser'); // Import cookie-parser

// Use cookie-parser middleware
router.use(cookieParser());


router.get("/", getAllEventsUsers);
router.get("/:id", getEventUserById);
router.post("/", createEventUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser); 







module.exports = router;

