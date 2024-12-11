const mongoose = require("mongoose");

const kshetraSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  Kshetra: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const KshetraModel = mongoose.model("Kshetra", kshetraSchema);

module.exports = KshetraModel;
