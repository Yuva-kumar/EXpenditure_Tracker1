const Course = require("../../models/CourseModel.js");
const GetCourse = async (req, res) => {
  const data = await Course.find({});
  if (data.length === 0) {
    res.json([]);
    return;
  }
  console.log(data);
  res.json(data);
};

module.exports = GetCourse;
