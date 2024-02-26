const {
	initializePayment, createEvent
	
} = require("../controllers/eventControllers");
const Event = require("../models/eventModel");
const express = require("express");

const router = express.Router();



router.post("/", createEvent);
router.post("/api/paystack/authorization-url", initializePayment);




module.exports = router;
