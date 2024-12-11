const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  bankName: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: false,
  },
});

const BankModel = mongoose.model("bankName", bankSchema);

module.exports = BankModel;
