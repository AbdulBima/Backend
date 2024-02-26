const {
	getAllOrders,
	getOrderById,
  createOrder,
	
} = require("../controllers/orderControllers");
const Event = require("../models/orderModel");
const express = require("express");

const router = express.Router();


router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);




module.exports = router;
