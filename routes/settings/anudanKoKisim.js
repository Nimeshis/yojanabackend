const express = require("express");
const router = express.Router();
const anudanKoKisim = require("../models/settings/anudanKoKisim");
const CounterModel = require("../../models/counterModel");

// Get all anudanKoKisim
router.get("/", async (req, res) => {
  try {
    const anudanKoKisim = await anudanKoKisim.find();
    res.json(anudanKoKisim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new anudanKoKisim
router.post("/", async (req, res) => {
  try {
    // Find and increment the current anudanId counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "anudanId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new anudanKoKisim with the incremented anudanId
    const anudanKoKisim = new anudanKoKisim({
      id: counter.sequence_value,
      anudanKoKisim: req.body.anudanKoKisim,
      description: req.body.description,
    });

    await anudanKoKisim.save();
    res.status(201).json(anudanKoKisim);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a anudanKoKisim by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the anudanKoKisim by _id (custom id field)
    const anudanKoKisim = await anudanKoKisim.findById(id);

    // If no anudanKoKisim is found with the given id, return a 404 error
    if (!anudanKoKisim) {
      return res.status(404).json({ message: "anudan not found" });
    }

    // Return the found anudanKoKisim
    res.json(anudanKoKisim);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a anudanKoKisim by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let anudanKoKisim = await anudanKoKisim.findById(id);

    // If no anudanKoKisim is found with the given id, return a 404 error
    if (!anudanKoKisim) {
      return res.status(404).json({ message: "anudan not found" });
    }

    // Update anudanKoKisim fields with data from request body
    anudanKoKisim.anudanKoKisim = req.body.name || anudanKoKisim.anudanKoKisim;
    anudanKoKisim.description =
      req.body.description || anudanKoKisim.description;

    // Save the updated anudanKoKisim
    anudanKoKisim = await anudanKoKisim.save();

    // Return the updated anudanKoKisim
    res.json(anudanKoKisim);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a anudanKoKisim by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the anudanKoKisim by id
    const anudanKoKisim = await anudanKoKisim.findById(id);

    // If no anudanKoKisim is found with the given id, return a 404 error
    if (!anudanKoKisim) {
      return res.status(404).json({ message: "anudan not found" });
    }

    // Remove the anudanKoKisim from the database
    await anudanKoKisim.remove();

    // Return a success message
    res.json({ message: "anudan deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all anudanKoKisim
router.delete("/", async (req, res) => {
  try {
    // Remove all anudanKoKisim from the database
    await anudanKoKisim.deleteMany({});

    // Return a success message
    res.json({ message: "All anudanKoKisim deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
