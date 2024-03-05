const {  getAllEventsUsers,
	getEventUserById,
	createEventUser,
	
} = require("../controllers/eventUserControllers");
const EventUser = require("../models/eventUser");
const express = require("express");

const router = express.Router();


router.get("/", getAllEventsUsers);
router.get("/:id", getEventUserById);
router.post("/", createEventUser);





module.exports = router;

