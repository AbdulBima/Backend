const {
	getAllOrders,
	getOrderById,
	getOrdersByOrdererId,
  createOrder,
	getOrdersForAnEvent,
	getTicketCountForEvent,
	
} = require("../controllers/orderControllers");
const Event = require("../models/orderModel");
const express = require("express");

const router = express.Router();


router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.get("/orders/:ordererId", getOrdersByOrdererId);
router.post("/", createOrder);
router.get("/od/:eventcreator/:eventId", getOrdersForAnEvent);
router.get("/eventticketcount/:id", getTicketCountForEvent);




module.exports = router;
