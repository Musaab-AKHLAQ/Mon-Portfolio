const express = require("express");
const app = express();

const numToFind = Math.floor(Math.random() * 101);

app.get("/guess", (req, res) => {
  const num = Number(req.query.num);

  if (!num) {
    res.json({ message: "no number was send" });
  } else if (num > 100) {
    res.json({ message: "the number must be between 0 and 100" });
  } else {
    if (num > numToFind) {
      res.json({ result: "it's less" });
    } else if (num < numToFind) {
      res.json({ result: "it's more" });
    } else {
      res.json({ result: "it's won" });
    }
  }
});

app.listen(3000, () => {
  console.log("Server has started");
});
