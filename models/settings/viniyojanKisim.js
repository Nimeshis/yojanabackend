const mongoose = require("mongoose");

const viniyojanKisimSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  viniyojanKisim: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const viniyojanKisim = mongoose.model("viniyojanKisim", viniyojanKisimSchema);

module.exports = viniyojanKisim;
