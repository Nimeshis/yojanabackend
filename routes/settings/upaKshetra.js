const express = require("express");
const router = express.Router();
const upaKshetraModel = require("../models/settings/upaKshetra");
const CounterModel = require("../../models/counterModel");

// Get all upaKshetra
router.get("/", async (req, res) => {
  try {
    const upaKshetra = await upaKshetraModel.find();
    res.json(upaKshetra);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new upaKshetra
router.post("/", async (req, res) => {
  try {
    // Find and increment the current upaKshetraId counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "upaKshetraId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new upaKshetra with the incremented upaKshetraId
    const upaKshetra = new upaKshetraModel({
      id: counter.sequence_value,
      upaKshetra: req.body.upaKshetra,
      upaKshetra: req.body.upaKshetra,
    });

    await upaKshetra.save();
    res.status(201).json(upaKshetra);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a upaKshetra by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the upaKshetraModel by _id (custom id field)
    const upaKshetra = await upaKshetraModel.findById(id);

    // If no upaKshetra is found with the given id, return a 404 error
    if (!upaKshetra) {
      return res.status(404).json({ message: "upaKshetra not found" });
    }

    // Return the found upaKshetra
    res.json(upaKshetra);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a upaKshetra by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let upaKshetra = await upaKshetraModel.findById(id);

    // If no upaKshetra is found with the given id, return a 404 error
    if (!upaKshetra) {
      return res.status(404).json({ message: "upaKshetra not found" });
    }

    // Update upaKshetra fields with data from request body
    upaKshetra.upaKshetra = req.body.name || upaKshetra.upaKshetra;
    upaKshetra.upaKshetra = req.body.upaKshetra || upaKshetra.upaKshetra;
    upaKshetra.address = req.body.address || upaKshetra.address;

    // Save the updated upaKshetra
    upaKshetra = await upaKshetra.save();

    // Return the updated upaKshetra
    res.json(upaKshetra);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a upaKshetra by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the upaKshetra by id
    const upaKshetra = await upaKshetraModel.findById(id);

    // If no upaKshetra is found with the given id, return a 404 error
    if (!upaKshetra) {
      return res.status(404).json({ message: "upaKshetra not found" });
    }

    // Remove the upaKshetra from the database
    await upaKshetra.remove();

    // Return a success message
    res.json({ message: "upaKshetra deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all upaKshetra
router.delete("/", async (req, res) => {
  try {
    // Remove all upaKshetra from the database
    await upaKshetraModel.deleteMany({});

    // Return a success message
    res.json({ message: "All upaKshetra deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
