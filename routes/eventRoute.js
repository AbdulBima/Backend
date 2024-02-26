const {
	initializePayment, createEvent, getAllEvents, getEventById
	
} = require("../controllers/eventControllers");
const Event = require("../models/eventModel");
const express = require("express");

const router = express.Router();


router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.post("/api/paystack/authorization-url", initializePayment);




module.exports = router;
