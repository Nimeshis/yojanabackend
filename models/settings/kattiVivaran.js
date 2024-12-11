const mongoose = require("mongoose");

const kattiVivaranSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  kattiName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const KattiVivaranModel = mongoose.model("kattiName", kattiVivaranSchema);

module.exports = KattiVivaranModel;
