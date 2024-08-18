const express = require("express");
const router = express.Router();
const kharchaKisimModel = require("../models/settings/kharchaKisim");
const CounterModel = require("../../models/counterModel");

// Get all kharchaKisim
router.get("/", async (req, res) => {
  try {
    const kharchaKisim = await kharchaKisimModel.find();
    res.json(kharchaKisim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new kharchaKisim
router.post("/", async (req, res) => {
  try {
    // Find and increment the current kharchaKisim counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "kharchaKisimId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new kharchaKisim with the incremented kharchaKisim
    const kharchaKisim = new kharchaKisimModel({
      id: counter.sequence_value,
      kharchaKisim: req.body.kharchaKisim,
      karmachariKoPadh: req.body.karmachariKoPadh,
    });

    await kharchaKisim.save();
    res.status(201).json(kharchaKisim);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a kharchaKisim by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the kharchaKisimModel by _id (custom id field)
    const kharchaKisim = await kharchaKisimModel.findById(id);

    // If no kharchaKisim is found with the given id, return a 404 error
    if (!kharchaKisim) {
      return res.status(404).json({ message: "kharchaKisim not found" });
    }

    // Return the found kharchaKisim
    res.json(kharchaKisim);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a kharchaKisim by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let kharchaKisim = await kharchaKisimModel.findById(id);

    // If no kharchaKisim is found with the given id, return a 404 error
    if (!kharchaKisim) {
      return res.status(404).json({ message: "kharchaKisim not found" });
    }

    // Update kharchaKisim fields with data from request body
    kharchaKisim.kharchaKisim = req.body.name || kharchaKisim.kharchaKisim;
    kharchaKisim.karmachariKoPadh =
      req.body.karmachariKoPadh || kharchaKisim.karmachariKoPadh;

    // Save the updated kharchaKisim
    kharchaKisim = await kharchaKisim.save();

    // Return the updated kharchaKisim
    res.json(kharchaKisim);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a kharchaKisim by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the kharchaKisim by id
    const kharchaKisim = await kharchaKisimModel.findById(id);

    // If no kharchaKisim is found with the given id, return a 404 error
    if (!kharchaKisim) {
      return res.status(404).json({ message: "kharchaKisim not found" });
    }

    // Remove the kharchaKisim from the database
    await kharchaKisim.remove();

    // Return a success message
    res.json({ message: "kharchaKisim deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all kharchaKisim
router.delete("/", async (req, res) => {
  try {
    // Remove all kharchaKisim from the database
    await kharchaKisimModel.deleteMany({});

    // Return a success message
    res.json({ message: "All kharchaKisim deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
