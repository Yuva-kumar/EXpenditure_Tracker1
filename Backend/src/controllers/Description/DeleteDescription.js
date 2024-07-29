const DescriptionModel = require("../../models/DescriptionModel.js");
const DeleteDescription = async (req, res) => {
  try {
    const descriptionName = req.params.description;
    console.log(descriptionName);
    const deletedDescription = await DescriptionModel.findOneAndDelete({
      description: descriptionName,
    });

    if (!deletedDescription) {
      return res
        .status(200)
        .json({ success: false, message: "Description not found" });
    }
    res.status(200).json({
      success: true,
      message: "Description deleted successfully",
      deletedDescription,
    });
  } catch (error) {
    console.error("Error deleting Description:", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

module.exports = DeleteDescription;
