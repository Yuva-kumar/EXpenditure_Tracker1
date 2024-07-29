const mongoose = require("mongoose");

const DescriptionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const DescriptionModel = mongoose.model("Description", DescriptionSchema);
module.exports = DescriptionModel;
