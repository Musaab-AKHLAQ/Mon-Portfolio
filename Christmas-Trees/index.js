const express = require("express");
const app = express();
app.use(express.json());

const collectPoints = require("./points-de-collectes-des-sapins-Paris.json");

app.get("/", (req, res) => {
  console.log(req.query);
  if (Number(req.query.arrdt) > 20) {
    res.json({ message: "This district does not exist" });
  } else {
    let results = [];

    for (let i = 0; i < collectPoints.length; i++) {
      if (collectPoints[i].fields.arrdt === Number(req.query.arrdt)) {
        results.push({
          garden: collectPoints[i].fields.jardin,
          address: collectPoints[i].fields.adresse,
          arrdt: collectPoints[i].fields.arrdt,
        });
      }
    }
    res.json(results); //Pourquoi on met res.json(results) à la fin ? parce que il faut d'abord préparer les donnée avant de les envoyer
  }
});

app.listen(3000, () => {
  console.log("Server has started");
});
