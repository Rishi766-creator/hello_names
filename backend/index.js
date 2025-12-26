const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let name_list = [];

app.post("/api/names", (req, res) => {
  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name must be a non-empty string",
    });
  }

  name_list.push(name.trim());

  res.status(201).json({
    success: true,
    message: "Name stored successfully",
  });
});

app.get("/api/names", (req, res) => {
  res.json({
    success: true,
    names,
  });
});


app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
