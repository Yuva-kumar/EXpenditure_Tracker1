const DescriptionModel = require("../../models/DescriptionModel.js");
const AddDescription = async (req, res) => {
  try {
    const { description } = req.body;
    console.log(description);
    const save_data = new DescriptionModel({
      description,
    });
    await save_data.save();
    console.log(save_data);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

module.exports = AddDescription;
