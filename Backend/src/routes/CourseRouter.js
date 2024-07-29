const GetCourse = require("../controllers/Courses/GetCourse.js");
const DeleteCourse = require("../controllers/Courses/DeleteCourse.js");
const AddCourse = require("../controllers/Courses/AddCourse.js");
const express = require("express");
const Route = express.Router();
Route.get("/GetCourse", GetCourse);
Route.delete("/DeleteCourse/:course", DeleteCourse);
Route.post("/AddCourse", AddCourse);
module.exports = Route;
