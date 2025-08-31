const express = require("express");
const app = express();
app.use(express.json());

app.post("/calculate", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const operator = req.body.operator;

  if (num1 && num2 && operator) {
    if (
      operator === "+" ||
      operator === "-" ||
      operator === "/" ||
      operator === "*"
    ) {
      if (typeof num1 === "number" && typeof num2 === "number") {
        let total;

        if (operator === "+") {
          total = num1 + num2;
        } else if (operator === "-") {
          total = num1 - num2;
        } else if (operator === "*") {
          total = num1 * num2;
        } else if (operator === "/") {
          total = num1 / num2;
        }
        res.json({ result: total });
      } else {
        res.json({ error: "Numbers must be send" });
      }
    } else {
      res.json({ error: "Worng operator" });
    }
  } else {
    res.json({ error: "Missing parameter(s)" });
  }
});

app.listen(3000, () => {
  console.log("server has started");
});
