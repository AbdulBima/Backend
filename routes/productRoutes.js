const {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/productControllers");
const Product = require("../models/productModel");
const express = require("express");

const router = express.Router();

// fetch all products
router.get("/", getAllProducts);

// fetch single data from database

router.get("/:id", getProductById);

//create a product

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
