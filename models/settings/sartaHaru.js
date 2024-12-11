const mongoose = require("mongoose");

const sartaSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  sarta: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const sartaModel = mongoose.model("sarta", sartaSchema);

module.exports = sartaModel;
