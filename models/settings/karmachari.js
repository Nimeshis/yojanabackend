const mongoose = require("mongoose");

const karmachariSchama = new mongoose.Schema({
  id: { type: Number, unique: true },

  karmachariKoName: {
    type: String,
    required: true,
    unique: true,
  },
  karmachariKoPadh: {
    type: String,
    required: true,
    unique: true,
  },
});

const KarmachariModel = mongoose.model("karmachariKoName", karmachariSchama);

module.exports = KarmachariModel;
