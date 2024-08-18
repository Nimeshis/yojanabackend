const express = require("express");
const router = express.Router();
const KarmachariKoPadhModel = require("../models/settings/KarmachariKoPadhModel");
const CounterModel = require("../../models/counterModel");

// Get all karmachariKoPadh
router.get("/", async (req, res) => {
  try {
    const karmachariKoPadh = await KarmachariKoPadhModel.find();
    res.json(karmachariKoPadh);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new karmachariKoPadh
router.post("/", async (req, res) => {
  try {
    // Find and increment the current karmachariID counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "karmachariPadhID" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new karmachariKoPadh with the incremented karmachariID
    const karmachariKoPadh = new KarmachariKoPadhModel({
      id: counter.sequence_value,
      karmachariKoPadh: req.body.karmachariKoPadh,
      karmachariKoPadh: req.body.karmachariKoPadh,
    });

    await karmachariKoPadh.save();
    res.status(201).json(karmachariKoPadh);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a karmachariKoPadh by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the KarmachariKoPadhModel by _id (custom id field)
    const karmachariKoPadh = await KarmachariKoPadhModel.findById(id);

    // If no karmachariKoPadh is found with the given id, return a 404 error
    if (!karmachariKoPadh) {
      return res.status(404).json({ message: "Karmachari not found" });
    }

    // Return the found karmachariKoPadh
    res.json(karmachariKoPadh);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a karmachariKoPadh by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let karmachariKoPadh = await KarmachariKoPadhModel.findById(id);

    // If no karmachariKoPadh is found with the given id, return a 404 error
    if (!karmachariKoPadh) {
      return res.status(404).json({ message: "Karmachari not found" });
    }

    // Update karmachariKoPadh fields with data from request body
    karmachariKoPadh.karmachariKoPadh =
      req.body.name || karmachariKoPadh.karmachariKoPadh;
    karmachariKoPadh.karmachariKoPadh =
      req.body.karmachariKoPadh || karmachariKoPadh.karmachariKoPadh;

    // Save the updated karmachariKoPadh
    karmachariKoPadh = await karmachariKoPadh.save();

    // Return the updated karmachariKoPadh
    res.json(karmachariKoPadh);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a karmachariKoPadh by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the karmachariKoPadh by id
    const karmachariKoPadh = await KarmachariKoPadhModel.findById(id);

    // If no karmachariKoPadh is found with the given id, return a 404 error
    if (!karmachariKoPadh) {
      return res.status(404).json({ message: "Karmachari padh not found" });
    }

    // Remove the karmachariKoPadh from the database
    await karmachariKoPadh.remove();

    // Return a success message
    res.json({ message: "Karmachari padh deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all karmachariKoPadh
router.delete("/", async (req, res) => {
  try {
    // Remove all karmachariKoPadh from the database
    await KarmachariKoPadhModel.deleteMany({});

    // Return a success message
    res.json({ message: "All karmachari Padh deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
