const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  unit: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const UnitModel = mongoose.model("unit", unitSchema);

module.exports = UnitModel;
