const mongoose = require("mongoose");

const contingencySchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  contingencyType: {
    type: String,
    required: true,
    unique: true,
  },
  contingencyPercentage: {
    type: Number,
    required: false,
  },
});

const ContingencyModel = mongoose.model("contingency", contingencySchema);

module.exports = ContingencyModel;
