const {  getAllEventsUsers,
	getEventUserById,
	createEventUser,
	loginUser,
	
} = require("../controllers/eventUserControllers");
const EventUser = require("../models/eventUser");
const express = require("express");

const router = express.Router();


router.get("/", getAllEventsUsers);
router.get("/:id", getEventUserById);
router.post("/", createEventUser);
router.post("/", loginUser);





module.exports = router;

