const fs = require("fs");
const path = require("path");
const Expenditure = require("../../models/ExpenditureModel");

const AddExpenditure = async (req, res) => {
  try {
    console.log("stage 1");
    const expendituresData = req.body;
    console.log(expendituresData);

    // Create directory if it doesn't exist
    const dir = path.join(__dirname, "../../../Public/Files/");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    console.log("stage 2");

    // Loop through each expenditure object and save files to the server
    const savedExpenditures = [];
    for (const expenditureData of expendituresData) {
      console.log(expenditureData);

      // Assuming expenditureData.file contains the file data
      const fileData = expenditureData.file;
      const filePath = path.join(dir, expenditureData.file);

      // Write the file data to the specified filePath
      fs.writeFileSync(filePath, fileData);
      console.log("File saved:", filePath);

      // Create new expenditure instance
      const newExpenditure = new Expenditure({
        userLoggedIn: expenditureData.userLoggedIn,
        UploadDate: expenditureData.UploadDate,
        UploadTime: expenditureData.UploadTime,
        description: expenditureData.description,
        trainer: expenditureData.trainer,
        detail_description: expenditureData.detail_description,
        card: expenditureData.card,
        amount: expenditureData.amount,
        date: expenditureData.date,
        file: expenditureData.file, // Store filename in the database
      });

      // Save expenditure to MongoDB
      await newExpenditure.save();
      savedExpenditures.push(newExpenditure);
    }

    console.log("stage 3");
    res.status(200).json({
      success: true,
      message: "Expenditures added successfully",
      expenditures: savedExpenditures,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = AddExpenditure;
