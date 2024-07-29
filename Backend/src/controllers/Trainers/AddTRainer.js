const TrainerModel = require("../../models/TrainerModel.js");
const AddTrainer = async (req, res) => {
  try {
    const { name, id, domain } = req.body;
    console.log(name, id, domain);
    const save_data = new TrainerModel({
      name,
      id,
      domain,
    });
    await save_data.save();
    console.log(save_data);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

module.exports = AddTrainer;
