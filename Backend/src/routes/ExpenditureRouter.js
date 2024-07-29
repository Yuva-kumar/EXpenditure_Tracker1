const AddExpenditure = require("../controllers/Expenditure/AddExpenditure.js");

const express = require("express");
const Route = express.Router();
Route.post("/AddExpenditure", AddExpenditure);

module.exports = Route;
