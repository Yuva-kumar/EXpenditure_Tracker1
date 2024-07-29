const Course = require("../../models/CourseModel.js");
const DeleteCourse = async (req, res) => {
  try {
    const courseName = req.params.course;
    console.log(courseName);
    const deletedCourse = await Course.findOneAndDelete({ course: courseName });

    if (!deletedCourse) {
      return res
        .status(200)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      deletedCourse,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

module.exports = DeleteCourse;
