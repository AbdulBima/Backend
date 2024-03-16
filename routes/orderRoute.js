const {
	getAllOrders,
	getOrderById,
  createOrder,
	getOrdersForEventCreator,
	getTicketCountForEvent,
	
} = require("../controllers/orderControllers");
const Event = require("../models/orderModel");
const express = require("express");

const router = express.Router();


router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.get("/od/:eventCreator/:eventName", getOrdersForEventCreator);
router.get("/eventticketcount/:id", getTicketCountForEvent);




module.exports = router;
