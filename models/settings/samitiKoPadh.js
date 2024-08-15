const mongoose = require("mongoose");

const samitiKoPadhSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  samitiKoPadh: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const samitiKoPadh = mongoose.model("samitiKoPadh", samitiKoPadhSchema);

module.exports = samitiKoPadh;
