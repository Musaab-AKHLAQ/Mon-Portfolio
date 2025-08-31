const express = require("express");
const app = express();
const colors = require("./colors.json");

app.get("/send-a-color", (req, res) => {
  const color = colors[req.query.color];
  if (color) {
    res.json({
      color: req.query.color,
      hexa: color,
    });
  } else {
    res.json({ message: "color not found" });
  }
});

app.listen(3000, () => {
  console.log("Server has started");
});
