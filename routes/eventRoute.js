const {createEvent, getAllEvents, getEventById, getEventCreator
	
} = require("../controllers/eventControllers");
const Event = require("../models/eventModel");
const express = require("express");

const router = express.Router();

router.get("/creator/:eventCreator", getEventCreator);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);




module.exports = router;
