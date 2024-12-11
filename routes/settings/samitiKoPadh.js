const express = require("express");
const router = express.Router();
const samitiKoPadhModel = require("../models/settings/samitiKoPadhModel");
const CounterModel = require("../../models/counterModel");

// Get all karmacharis
router.get("/", async (req, res) => {
  try {
    const karmacharis = await samitiKoPadhModel.find();
    res.json(karmacharis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new samitiKoPadh
router.post("/", async (req, res) => {
  try {
    // Find and increment the current samitiKoId counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "samitiKoId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new samitiKoPadh with the incremented samitiKoId
    const samitiKoPadh = new samitiKoPadhModel({
      id: counter.sequence_value,
      samitiKoPadh: req.body.samitiKoPadh,
      samitiKoPadh: req.body.samitiKoPadh,
    });

    await samitiKoPadh.save();
    res.status(201).json(samitiKoPadh);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a samitiKoPadh by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the samitiKoPadhModel by _id (custom id field)
    const samitiKoPadh = await samitiKoPadhModel.findById(id);

    // If no samitiKoPadh is found with the given id, return a 404 error
    if (!samitiKoPadh) {
      return res.status(404).json({ message: "samiti ko padh not found" });
    }

    // Return the found samitiKoPadh
    res.json(samitiKoPadh);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a samitiKoPadh by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let samitiKoPadh = await samitiKoPadhModel.findById(id);

    // If no samitiKoPadh is found with the given id, return a 404 error
    if (!samitiKoPadh) {
      return res.status(404).json({ message: "samiti ko padh not found" });
    }

    // Update samitiKoPadh fields with data from request body
    samitiKoPadh.samitiKoPadh = req.body.name || samitiKoPadh.samitiKoPadh;
    samitiKoPadh.samitiKoPadh =
      req.body.samitiKoPadh || samitiKoPadh.samitiKoPadh;
    samitiKoPadh.address = req.body.address || samitiKoPadh.address;

    // Save the updated samitiKoPadh
    samitiKoPadh = await samitiKoPadh.save();

    // Return the updated samitiKoPadh
    res.json(samitiKoPadh);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a samitiKoPadh by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the samitiKoPadh by id
    const samitiKoPadh = await samitiKoPadhModel.findById(id);

    // If no samitiKoPadh is found with the given id, return a 404 error
    if (!samitiKoPadh) {
      return res.status(404).json({ message: "samiti ko padh not found" });
    }

    // Remove the samitiKoPadh from the database
    await samitiKoPadh.remove();

    // Return a success message
    res.json({ message: "samiti ko padh deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all karmacharis
router.delete("/", async (req, res) => {
  try {
    // Remove all karmacharis from the database
    await samitiKoPadhModel.deleteMany({});

    // Return a success message
    res.json({ message: "All karmacharis deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
