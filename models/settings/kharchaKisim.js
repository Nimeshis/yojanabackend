const mongoose = require("mongoose");

const kharchaKisimSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  kharchaKoName: {
    type: String,
    required: true,
    unique: true,
  },
  rakam: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const KharchaKisimModel = mongoose.model("kharchaKisim", kharchaKisimSchema);

module.exports = KharchaKisimModel;
