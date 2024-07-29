const CourseModel = require("../../models/CourseModel.js");
const AddCourse = async (req, res) => {
  try {
    console.log(req.body);
    const { course } = req.body;
    console.log(course);
    const save_data = new CourseModel({
      course,
    });
    await save_data.save();
    console.log(save_data);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(200).json({ success: false });
  }
};

module.exports = AddCourse;