const {
	getAllSubscribers,
	// getProductById,
	createSubscriber,
	// updateProduct,
	// deleteProduct,
} = require("../controllers/subscribersController");
const Subscriber = require("../models/subscribersModel");
const express = require("express");

const router = express.Router();

// fetch all products
router.get("/", getAllSubscribers);

// // fetch single data from database

// router.get("/:id", getProductById);

//create a product

router.post("/", createSubscriber);

// router.put("/:id", updateProduct);

// router.delete("/:id", deleteProduct);

module.exports = router;
