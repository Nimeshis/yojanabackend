const express = require("express");
const router = express.Router();
const KarmachariModel = require("../models/settings/KarmachariModel");
const CounterModel = require("../../models/counterModel");

// Get all karmacharis
router.get("/", async (req, res) => {
  try {
    const karmacharis = await KarmachariModel.find();
    res.json(karmacharis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new karmachari
router.post("/", async (req, res) => {
  try {
    // Find and increment the current karmachariID counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "karmachariID" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new karmachari with the incremented karmachariID
    const karmachari = new KarmachariModel({
      id: counter.sequence_value,
      karmachari: req.body.karmachari,
      karmachariKoPadh: req.body.karmachariKoPadh,
    });

    await karmachari.save();
    res.status(201).json(karmachari);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a karmachari by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the KarmachariModel by _id (custom id field)
    const karmachari = await KarmachariModel.findById(id);

    // If no karmachari is found with the given id, return a 404 error
    if (!karmachari) {
      return res.status(404).json({ message: "Karmachari not found" });
    }

    // Return the found karmachari
    res.json(karmachari);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a karmachari by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let karmachari = await KarmachariModel.findById(id);

    // If no karmachari is found with the given id, return a 404 error
    if (!karmachari) {
      return res.status(404).json({ message: "Karmachari not found" });
    }

    // Update karmachari fields with data from request body
    karmachari.karmachari = req.body.name || karmachari.karmachari;
    karmachari.karmachariKoPadh =
      req.body.karmachariKoPadh || karmachari.karmachariKoPadh;
    karmachari.address = req.body.address || karmachari.address;

    // Save the updated karmachari
    karmachari = await karmachari.save();

    // Return the updated karmachari
    res.json(karmachari);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a karmachari by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the karmachari by id
    const karmachari = await KarmachariModel.findById(id);

    // If no karmachari is found with the given id, return a 404 error
    if (!karmachari) {
      return res.status(404).json({ message: "Karmachari not found" });
    }

    // Remove the karmachari from the database
    await karmachari.remove();

    // Return a success message
    res.json({ message: "Karmachari deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all karmacharis
router.delete("/", async (req, res) => {
  try {
    // Remove all karmacharis from the database
    await KarmachariModel.deleteMany({});

    // Return a success message
    res.json({ message: "All karmacharis deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
