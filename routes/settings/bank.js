const express = require("express");
const router = express.Router();
const BankModel = require("../models/settings/BankModel");
const CounterModel = require("../../models/counterModel");

// Get all banks
router.get("/", async (req, res) => {
  try {
    const banks = await BankModel.find();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new bank
router.post("/", async (req, res) => {
  try {
    // Find and increment the current bankId counter
    let counter = await CounterModel.findOneAndUpdate(
      { id: "bankId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new bank with the incremented bankId
    const bank = new BankModel({
      id: counter.sequence_value,
      bank: req.body.bank,
      description: req.body.description,
    });

    await bank.save();
    res.status(201).json(bank);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a bank by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Query the BankModel by _id (custom id field)
    const bank = await BankModel.findById(id);

    // If no bank is found with the given id, return a 404 error
    if (!bank) {
      return res.status(404).json({ message: "Bank not found" });
    }

    // Return the found bank
    res.json(bank);
  } catch (err) {
    // If an error occurs during the query, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Update a bank by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let bank = await BankModel.findById(id);

    // If no bank is found with the given id, return a 404 error
    if (!bank) {
      return res.status(404).json({ message: "Bank not found" });
    }

    // Update bank fields with data from request body
    bank.bank = req.body.name || bank.bank;
    bank.description = req.body.description || bank.description;
    bank.address = req.body.address || bank.address;

    // Save the updated bank
    bank = await bank.save();

    // Return the updated bank
    res.json(bank);
  } catch (err) {
    // If an error occurs during the update, return a 400 error
    res.status(400).json({ message: err.message });
  }
});

// Delete a bank by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the bank by id
    const bank = await BankModel.findById(id);

    // If no bank is found with the given id, return a 404 error
    if (!bank) {
      return res.status(404).json({ message: "Bank not found" });
    }

    // Remove the bank from the database
    await bank.remove();

    // Return a success message
    res.json({ message: "Bank deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

// Delete all banks
router.delete("/", async (req, res) => {
  try {
    // Remove all banks from the database
    await BankModel.deleteMany({});

    // Return a success message
    res.json({ message: "All banks deleted" });
  } catch (err) {
    // If an error occurs during the delete operation, return a 500 error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
