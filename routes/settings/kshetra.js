const express = require("express");
const router = express.Router();
const kshetraModel = require("../models/settings/kshetra");
const CounterModel = require("../../models/counterModel");

// Get all kshetras
router.get("/", async (req, res) => {
  try {
    const kshetras = await kshetraModel.find();
    res.json(kshetras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new kshetra
router.post("/", async (req, res) => {
  try {
    // Find and increment the current karmachariID counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "karmachariID" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new kshetra with the incremented karmachariID
    const kshetra = new kshetraModel({
      id: counter.sequence_value,
      kshetra: req.body.kshetra,
      kshetra: req.body.kshetra,
    });

    await kshetra.save();
    res.status(201).json(kshetra);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a kshetra by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the kshetraModel by _id (custom id field)
    const kshetra = await kshetraModel.findById(id);

    // If no kshetra is found with the given id, return a 404 error
    if (!kshetra) {
      return res.status(404).json({ message: "kshetra not found" });
    }

    // Return the found kshetra
    res.json(kshetra);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a kshetra by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let kshetra = await kshetraModel.findById(id);

    // If no kshetra is found with the given id, return a 404 error
    if (!kshetra) {
      return res.status(404).json({ message: "kshetra not found" });
    }

    // Update kshetra fields with data from request body
    kshetra.kshetra = req.body.name || kshetra.kshetra;
    kshetra.kshetra = req.body.kshetra || kshetra.kshetra;
    kshetra.address = req.body.address || kshetra.address;

    // Save the updated kshetra
    kshetra = await kshetra.save();

    // Return the updated kshetra
    res.json(kshetra);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a kshetra by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the kshetra by id
    const kshetra = await kshetraModel.findById(id);

    // If no kshetra is found with the given id, return a 404 error
    if (!kshetra) {
      return res.status(404).json({ message: "kshetra not found" });
    }

    // Remove the kshetra from the database
    await kshetra.remove();

    // Return a success message
    res.json({ message: "kshetra deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all kshetras
router.delete("/", async (req, res) => {
  try {
    // Remove all kshetras from the database
    await kshetraModel.deleteMany({});

    // Return a success message
    res.json({ message: "All kshetras deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
