const mongoose = require("mongoose");

const AnudanKisimSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  anudanKisim: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const AnudanKisim = mongoose.model("unit", AnudanKisimSchema);

module.exports = AnudanKisim;
