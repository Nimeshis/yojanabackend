const express = require("express");
const router = express.Router();
const GenderModel = require("../models/settings/gender");
const CounterModel = require("../../models/counterModel");

// Get all genders
router.get("/", async (req, res) => {
  try {
    const genders = await GenderModel.find();
    res.json(genders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new gender
router.post("/", async (req, res) => {
  try {
    // Find and increment the current genderId counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "genderId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new gender with the incremented genderId
    const gender = new GenderModel({
      id: counter.sequence_value,
      gender: req.body.gender,
      description: req.body.description,
    });

    await gender.save();
    res.status(201).json(gender);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a gender by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the GenderModel by _id (custom id field)
    const gender = await GenderModel.findById(id);

    // If no gender is found with the given id, return a 404 error
    if (!gender) {
      return res.status(404).json({ message: "Gender not found" });
    }

    // Return the found gender
    res.json(gender);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a gender by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let gender = await GenderModel.findById(id);

    // If no gender is found with the given id, return a 404 error
    if (!gender) {
      return res.status(404).json({ message: "Gender not found" });
    }

    // Update gender fields with data from request body
    gender.gender = req.body.name || gender.gender;
    gender.description = req.body.description || gender.description;
    gender.address = req.body.address || gender.address;

    // Save the updated gender
    gender = await gender.save();

    // Return the updated gender
    res.json(gender);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a gender by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the gender by id
    const gender = await GenderModel.findById(id);

    // If no gender is found with the given id, return a 404 error
    if (!gender) {
      return res.status(404).json({ message: "Gender not found" });
    }

    // Remove the gender from the database
    await gender.remove();

    // Return a success message
    res.json({ message: "Gender deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all genders
router.delete("/", async (req, res) => {
  try {
    // Remove all genders from the database
    await GenderModel.deleteMany({});

    // Return a success message
    res.json({ message: "All genders deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
