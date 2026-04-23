const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/drugstore");

const Drug = mongoose.model("Drug", {
  name: String,
  quantity: Number,
});

const History = mongoose.model("History", {
  name: String,
  modif: String,
  quantity: Number,
  date: String,
});

app.post("/drugs", async (req, res) => {
  try {
    const existingDrug = await Drug.findOne({ name: req.body.name });
    if (existingDrug) {
      res.status(400).json({ message: "Drug already exists" });
    } else {
      const newDrug = new Drug({
        name: req.body.name,
        quantity: req.body.quantity,
      });
      await newDrug.save();
      const newHistory = new History({
        name: req.body.name,
        modif: "created",
        quantity: req.body.quantity,
        date: new Date(),
      });
      await newHistory.save();
      res.status(201).json(newDrug);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/drugs", async (req, res) => {
  try {
    const allDrugs = await Drug.find();
    res.json(allDrugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/drugs/add/:id", async (req, res) => {
  try {
    const drugToModify = await Drug.findById(req.params.id);
    if (drugToModify) {
      drugToModify.quantity = drugToModify.quantity + req.body.quantity;
      await drugToModify.save();
      const newHistory = new History({
        name: drugToModify.name,
        modif: `+${req.body.quantity}`,
        quantity: drugToModify.quantity,
        date: new Date(),
      });
      await newHistory.save();
      res.json(drugToModify);
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/drugs/remove/:id", async (req, res) => {
  try {
    const drugToModify = await Drug.findById(req.params.id);
    if (drugToModify) {
      if (drugToModify.quantity >= req.body.quantity) {
        drugToModify.quantity = drugToModify.quantity - req.body.quantity;
        await drugToModify.save();
        const newHistory = new History({
          name: drugToModify.name,
          modif: `-${req.body.quantity}`,
          quantity: drugToModify.quantity,
          date: new Date(),
        });
        await newHistory.save();
        res.json(drugToModify);
      } else {
        res.status(400).json({ message: "Invalid quantity" });
      }
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/drugs/quantity", async (req, res) => {
  try {
    const DrugsToDisplay = await Drug.findOne({ name: req.query.name });
    res.json(DrugsToDisplay.quantity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/drugs/:id", async (req, res) => {
  try {
    const drugToModify = await Drug.findById(req.params.id);
    if (drugToModify) {
      const oldName = drugToModify.name;
      drugToModify.name = req.body.newName;
      await drugToModify.save();
      const newHistory = new History({
        name: req.body.newName,
        modif: `Name changed from ${oldName} to ${req.body.newName}`,
        quantity: drugToModify.quantity,
        date: new Date(),
      });
      await newHistory.save();
      res.json(drugToModify);
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/drugs/:id", async (req, res) => {
  try {
    const drugToDelete = await Drug.findByIdAndDelete(req.params.id);
    if (!drugToDelete) {
      res.status(404).json({ message: "Drug not found" });
    }
    const newHistory = new History({
      name: drugToDelete.name,
      modif: "deleted",
      quantity: 0,
      date: new Date(),
    });
    await newHistory.save();
    res.json({ message: "Drug deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/history", async (req, res) => {
  try {
    const allHistory = await History.find();
    res.json(allHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "This route does not exists." });
});

app.listen(3000, () => {
  console.log("Server started");
});
