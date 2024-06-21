const Minna = require("../models/minnaModel");
const asyncHandler = require("express-async-handler");

// create a business
const createBusiness = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const newBusiness = new Minna(req.body);
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    console.error('Error saving business data:', error);
    res.status(500).json({ error: 'An error occurred while saving business data' });
  }
});

// get all businesses
const getAllBusinesses = asyncHandler(async (req, res) => {
  try {
    const minnaBusinesses = await Minna.find({});
    res.status(200).json(minnaBusinesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get business by id
const getBusinessById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Minna.findById(id);
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
};
