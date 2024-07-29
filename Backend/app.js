const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const CourseRoute = require("./src/routes/CourseRouter.js");
const TrainerRoute = require("./src/routes/TrainerRouter.js");
const DescriptionRoute = require("./src/routes/DescriptionRouter.js");
const ExpenditureRoute = require("./src/routes/ExpenditureRouter.js");

const app = express();
const PORT = 5000;


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://deepaksj157:7R83h0NGMFvuXv5R@cluster0.ytmvsqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/Course", CourseRoute);
app.use("/api/Trainer", TrainerRoute);
app.use("/api/Description", DescriptionRoute);
app.use("/api/Expenditure", ExpenditureRoute);

// Testing Route
app.get("/testing", (req, res, next) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
