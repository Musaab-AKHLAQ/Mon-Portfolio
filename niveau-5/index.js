const express = require("express");
const app = express();
app.use(express.json());

const covid = require("./covid.json");

app.get("/", (req, res) => {
  res.json(
    covid.map(
      ({ name, latest_data: { confirmed: cases, deaths, recovered } }) => {
        return {
          name,
          cases,
          deaths,
          recovered,
        };
      }
    )
  );
});

app.post("/by-country", (req, res) => {
  const {
    name,
    latest_data: { confirmed: cases, deaths, recovered },
  } = covid.find((element) => element.name === req.body.country);
  res.json({
    name,
    cases,
    deaths,
    recovered,
  });
});

app.listen(3000, () => {
  console.log("Server Started");
});
