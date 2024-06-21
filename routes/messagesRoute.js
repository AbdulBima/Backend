const {
	createMessage,
} = require("../controllers/messagesController");

const Messages = require("../models/messageModel");
const express = require("express");

const router = express.Router();

router.post("/", createMessage);

module.exports = router;
