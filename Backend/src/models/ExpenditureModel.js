const mongoose = require("mongoose");

const ExpenditureSchema = new mongoose.Schema({
  userLoggedIn: {
    type: String,
    required: true,
  },
  UploadDate: {
    type: String,
    required: true,
  },
  UploadTime: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trainer: {
    type: String,
    required: true,
  },
  detail_description: {
    type: String,
    required: true,
  },
  card: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Expenditure", ExpenditureSchema);
