const { createBusiness,
	getAllBusinesses,
	getBusinessById,
} = require("../controllers/minnaControllers");
const Minna = require("../models/minnaModel");
const express = require("express");

const router = express.Router();

router.get("/", getAllBusinesses);
router.get("/:id", getBusinessById);
router.post("/", createBusiness);




module.exports = router;
