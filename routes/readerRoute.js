const {
	createReader,
	getAllReaders,
} = require("../controllers/readerControllers");
const Subscriber = require("../models/readerModel");
const express = require("express");

const router = express.Router();

router.post("/", createReader);
router.get("/", getAllReaders);

module.exports = router;
