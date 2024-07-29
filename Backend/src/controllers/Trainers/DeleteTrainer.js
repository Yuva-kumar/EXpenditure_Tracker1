const Trainer = require("../../models/TrainerModel.js");

const DeleteTrainer = async (req, res) => {
  console.log("came to Controller Page");
  try {
    const { name, id, domain } = req.body; // Accessing data from req.body
    console.log(name, id, domain);

    // Add logic to delete the trainer
    await Trainer.findOneAndDelete({ name, id, domain });

    res
      .status(200)
      .json({ success: true, message: "Trainer deleted successfully" });
  } catch (error) {
    console.error("Error deleting Trainer:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = DeleteTrainer;
