const mongoose = require("mongoose");

// Define Counter schema
const counterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 },
});

// Compile the schema into a model
const CounterModel = mongoose.model("Counter", counterSchema);

module.exports = CounterModel;
