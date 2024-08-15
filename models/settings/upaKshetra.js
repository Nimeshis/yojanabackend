const mongoose = require("mongoose");

const upaKshetraSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  kshetra: {
    type: String,
    required: true,
    unique: true,
  },
  upaKshetra: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const upaKshetraModel = mongoose.model("upaKshetra", upaKshetraSchema);

module.exports = upaKshetraModel;
