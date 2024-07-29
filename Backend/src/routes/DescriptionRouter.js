const GetDescription = require("../controllers/Description/GetDescription.js");
const DeletedDescription = require("../controllers/Description/DeleteDescription.js");
const AddDescription = require("../controllers/Description/AddDescription.js");
const express = require("express");
const Route = express.Router();
Route.get("/GetDescription", GetDescription);
Route.delete("/DeletedDescription/:description", DeletedDescription);
Route.post("/AddDescription", AddDescription);
module.exports = Route;
