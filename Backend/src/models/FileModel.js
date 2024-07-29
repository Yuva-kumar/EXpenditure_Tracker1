const mongoose = require("mongoose");
const FileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const FileModel = mongoose.model("File", FileSchema);
module.exports = FileModel;
