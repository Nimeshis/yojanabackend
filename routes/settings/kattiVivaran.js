const express = require("express");
const router = express.Router();
const kattiVivaranModel = require("../models/settings/kattiVivaran");
const CounterModel = require("../../models/counterModel");

// Get all kattiVivaran
router.get("/", async (req, res) => {
  try {
    const kattiVivaran = await kattiVivaranModel.find();
    res.json(kattiVivaran);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new kattiVivaran
router.post("/", async (req, res) => {
  try {
    // Find and increment the current kattiVivaranId counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "kattiVivaranId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new kattiVivaran with the incremented kattiVivaranId
    const kattiVivaran = new kattiVivaranModel({
      id: counter.sequence_value,
      kattiVivaran: req.body.kattiVivaran,
      karmachariKoPadh: req.body.karmachariKoPadh,
    });

    await kattiVivaran.save();
    res.status(201).json(kattiVivaran);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a kattiVivaran by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the kattiVivaranModel by _id (custom id field)
    const kattiVivaran = await kattiVivaranModel.findById(id);

    // If no kattiVivaran is found with the given id, return a 404 error
    if (!kattiVivaran) {
      return res.status(404).json({ message: "kattiVivaran not found" });
    }

    // Return the found kattiVivaran
    res.json(kattiVivaran);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a kattiVivaran by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let kattiVivaran = await kattiVivaranModel.findById(id);

    // If no kattiVivaran is found with the given id, return a 404 error
    if (!kattiVivaran) {
      return res.status(404).json({ message: "kattiVivaran not found" });
    }

    // Update kattiVivaran fields with data from request body
    kattiVivaran.kattiVivaran = req.body.name || kattiVivaran.kattiVivaran;
    kattiVivaran.karmachariKoPadh =
      req.body.karmachariKoPadh || kattiVivaran.karmachariKoPadh;
    kattiVivaran.address = req.body.address || kattiVivaran.address;

    // Save the updated kattiVivaran
    kattiVivaran = await kattiVivaran.save();

    // Return the updated kattiVivaran
    res.json(kattiVivaran);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a kattiVivaran by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the kattiVivaran by id
    const kattiVivaran = await kattiVivaranModel.findById(id);

    // If no kattiVivaran is found with the given id, return a 404 error
    if (!kattiVivaran) {
      return res.status(404).json({ message: "kattiVivaran not found" });
    }

    // Remove the kattiVivaran from the database
    await kattiVivaran.remove();

    // Return a success message
    res.json({ message: "kattiVivaran deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all kattiVivaran
router.delete("/", async (req, res) => {
  try {
    // Remove all kattiVivaran from the database
    await kattiVivaranModel.deleteMany({});

    // Return a success message
    res.json({ message: "All kattiVivaran deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
