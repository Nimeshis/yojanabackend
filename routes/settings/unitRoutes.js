const express = require("express");
const router = express.Router();
const UnitModel = require("../models/settings/unitModel");
const CounterModel = require("../../models/counterModel");

// Get all units
router.get("/", async (req, res) => {
  try {
    const units = await UnitModel.find();
    res.json(units);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new unit
router.post("/", async (req, res) => {
  try {
    // Find and increment the current unitId counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "unitId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new unit with the incremented unitId
    const unit = new UnitModel({
      id: counter.sequence_value,
      unit: req.body.unit,
      description: req.body.description,
    });

    await unit.save();
    res.status(201).json(unit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a unit by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the UnitModel by _id (custom id field)
    const unit = await UnitModel.findById(id);

    // If no unit is found with the given id, return a 404 error
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // Return the found unit
    res.json(unit);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a unit by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let unit = await UnitModel.findById(id);

    // If no unit is found with the given id, return a 404 error
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // Update unit fields with data from request body
    unit.unit = req.body.name || unit.unit;
    unit.description = req.body.description || unit.description;

    // Save the updated unit
    unit = await unit.save();

    // Return the updated unit
    res.json(unit);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a unit by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the unit by id
    const unit = await UnitModel.findById(id);

    // If no unit is found with the given id, return a 404 error
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // Remove the unit from the database
    await unit.remove();

    // Return a success message
    res.json({ message: "Unit deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all units
router.delete("/", async (req, res) => {
  try {
    // Remove all units from the database
    await UnitModel.deleteMany({});

    // Return a success message
    res.json({ message: "All units deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
