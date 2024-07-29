const express = require("express");
const DeleteTrainer = require("../controllers/Trainers/DeleteTrainer.js");
const AddTrainer = require("../controllers/Trainers/AddTRainer.js");
const GetTrainer = require("../controllers/Trainers/GetTrainer.js");
const Route = express.Router();

Route.delete("/DeleteTrainer", DeleteTrainer);
Route.post("/AddTrainer", AddTrainer);
Route.get("/GetTrainer", GetTrainer);
module.exports = Route;
