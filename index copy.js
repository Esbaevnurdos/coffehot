const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies

app.post("/save-to-csv", (req, res) => {
  const inputText = req.body.inputText;
  const newLine = `${inputText}\n`;

  fs.appendFile("localfile copy.csv", newLine, (err) => {
    if (err) {
      console.error("Failed to append data to file:", err);
      // return res.status(500).send("Error writing to CSV");
    }
    console.log("Saved Succesfully");
    // res.send("Data was appended to CSV successfully");
  });
});

// Endpoint to handle deleting a row from CSV
app.post("/delete-row", (req, res) => {
  const { index } = req.body;
  fs.readFile("localfile copy.csv", "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read CSV file:", err);
      return res.status(500).send("Error reading CSV file");
    }
    let rows = data.trim().split("\n");
    if (index >= 0 && index < rows.length) {
      rows.splice(index, 1);
      const updatedCSV = rows.join("\n");
      fs.writeFile("localfile copy.csv", updatedCSV, (err) => {
        if (err) {
          console.error("Failed to write CSV file:", err);
          return res.status(500).send("Error writing CSV file");
        }
        console.log("Row deleted from CSV successfully");
        res.sendStatus(200);
      });
    } else {
      console.error("Invalid index:", index);
      res.status(400).send("Invalid index");
    }
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
