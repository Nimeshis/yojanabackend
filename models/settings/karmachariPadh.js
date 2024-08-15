const mongoose = require("mongoose");

const karmachariPadhSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  karmachariKoPadh: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const KarmachariKoPadhModel = mongoose.model(
  "karmachariKoPadh",
  karmachariPadhSchema
);

module.exports = KarmachariKoPadhModel;
