const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Store names with timestamps
let name_list = [];

// Add a new name
app.post("/api/names", (req, res) => {
  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name must be a non-empty string",
    });
  }

  const nameObj = {
    name: name.trim(),
    createdAt: new Date().toISOString(),
  };

  name_list.push(nameObj);

  res.status(201).json({
    success: true,
    message: "Name stored successfully",
    name: nameObj,
  });
});

// Get all names
app.get("/api/names", (req, res) => {
  res.json({
    success: true,
    names: name_list,
  });
});

// Delete all names
app.delete("/api/names", (req, res) => {
  name_list = [];
  res.json({
    success: true,
    message: "All names have been cleared",
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
