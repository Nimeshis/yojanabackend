const mongoose = require("mongoose");

const genderSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  gender: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const GenderModel = mongoose.model("gender", genderSchema);

module.exports = GenderModel;
