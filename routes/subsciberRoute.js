const {
	createSubscriber,
	
} = require("../controllers/subscribersController");
const Subscriber = require("../models/subscribersModel");
const express = require("express");

const router = express.Router();



router.post("/", createSubscriber);




module.exports = router;
