// TrainerModel.js
const mongoose = require("mongoose");

const TrainerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  domain: {
    // Corrected the typo here
    type: String,
    required: true,
  },
});

const TrainerModel = mongoose.model("Trainer", TrainerSchema);
module.exports = TrainerModel;
