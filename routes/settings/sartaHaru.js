const express = require("express");
const router = express.Router();
const sartaHaruModel = require("../models/settings/sartaHaru");
const CounterModel = require("../../models/counterModel");

// Get all karmacharis
router.get("/", async (req, res) => {
  try {
    const karmacharis = await sartaHaruModel.find();
    res.json(karmacharis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new sartaHaru
router.post("/", async (req, res) => {
  try {
    // Find and increment the current sartaId counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "sartaId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new sartaHaru with the incremented sartaId
    const sartaHaru = new sartaHaruModel({
      id: counter.sequence_value,
      sartaHaru: req.body.sartaHaru,
      karmachariKoPadh: req.body.karmachariKoPadh,
    });

    await sartaHaru.save();
    res.status(201).json(sartaHaru);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a sartaHaru by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the sartaHaruModel by _id (custom id field)
    const sartaHaru = await sartaHaruModel.findById(id);

    // If no sartaHaru is found with the given id, return a 404 error
    if (!sartaHaru) {
      return res.status(404).json({ message: "sarta not found" });
    }

    // Return the found sartaHaru
    res.json(sartaHaru);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a sartaHaru by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let sartaHaru = await sartaHaruModel.findById(id);

    // If no sartaHaru is found with the given id, return a 404 error
    if (!sartaHaru) {
      return res.status(404).json({ message: "sarta not found" });
    }

    // Update sartaHaru fields with data from request body
    sartaHaru.sartaHaru = req.body.name || sartaHaru.sartaHaru;
    sartaHaru.karmachariKoPadh =
      req.body.karmachariKoPadh || sartaHaru.karmachariKoPadh;
    sartaHaru.address = req.body.address || sartaHaru.address;

    // Save the updated sartaHaru
    sartaHaru = await sartaHaru.save();

    // Return the updated sartaHaru
    res.json(sartaHaru);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a sartaHaru by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the sartaHaru by id
    const sartaHaru = await sartaHaruModel.findById(id);

    // If no sartaHaru is found with the given id, return a 404 error
    if (!sartaHaru) {
      return res.status(404).json({ message: "sarta not found" });
    }

    // Remove the sartaHaru from the database
    await sartaHaru.remove();

    // Return a success message
    res.json({ message: "sarta deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all karmacharis
router.delete("/", async (req, res) => {
  try {
    // Remove all karmacharis from the database
    await sartaHaruModel.deleteMany({});

    // Return a success message
    res.json({ message: "All karmacharis deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
