const TrainerModel = require("../../models/TrainerModel.js");
const GetTrainer = async (req, res) => {
  const data = await TrainerModel.find({});
  if (data.length === 0) {
    res.json([]);
    return;
  }
  console.log(data);
  res.json(data);
};

module.exports = GetTrainer;
