const DescriptionModel = require("../../models/DescriptionModel.js");
const GetDescription = async (req, res) => {
  const data = await DescriptionModel.find({});
  if (data.length === 0) {
    res.json([]);
    return;
  }
  console.log(data);
  res.json(data);
};

module.exports = GetDescription;
