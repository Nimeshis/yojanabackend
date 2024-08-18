const express = require("express");
const router = express.Router();
const ContingencyModel = require("../../models/settings/contingency/contingencycontingency");
const CounterModel = require("../../models/counterModel");

// Get all contingency
router.get("/", async (req, res) => {
  try {
    const contingency = await ContingencyModel.find();
    res.json(contingency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new contingency
router.post("/", async (req, res) => {
  try {
    // Find and increment the current contingencyId counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "contingencyId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new contingency with the incremented contingencyId
    const contingency = new ContingencyModel({
      id: counter.sequence_value,
      contingency: req.body.contingency,
      description: req.body.description,
    });

    await contingency.save();
    res.status(201).json(contingency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a contingency by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the ContingencyModel by _id (custom id field)
    const contingency = await ContingencyModel.findById(id);

    // If no contingency is found with the given id, return a 404 error
    if (!contingency) {
      return res.status(404).json({ message: "Contingency not found" });
    }

    // Return the found contingency
    res.json(contingency);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a contingency by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let contingency = await ContingencyModel.findById(id);

    // If no contingency is found with the given id, return a 404 error
    if (!contingency) {
      return res.status(404).json({ message: "Contingency not found" });
    }

    // Update contingency fields with data from request body
    contingency.contingency = req.body.name || contingency.contingency;
    contingency.description = req.body.description || contingency.description;

    // Save the updated contingency
    contingency = await contingency.save();

    // Return the updated contingency
    res.json(contingency);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a contingency by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the contingency by id
    const contingency = await ContingencyModel.findById(id);

    // If no contingency is found with the given id, return a 404 error
    if (!contingency) {
      return res.status(404).json({ message: "Contingency not found" });
    }

    // Remove the contingency from the database
    await contingency.remove();

    // Return a success message
    res.json({ message: "Contingency deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all contingency
router.delete("/", async (req, res) => {
  try {
    // Remove all contingency from the database
    await ContingencyModel.deleteMany({});

    // Return a success message
    res.json({ message: "All contingency deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
