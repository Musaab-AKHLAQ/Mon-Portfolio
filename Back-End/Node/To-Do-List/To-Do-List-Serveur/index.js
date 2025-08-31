const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/to-do-list");

const Task = mongoose.model("Task", {
  name: String,
});

app.post("/todos", async (req, res) => {
  try {
    const existingTask = await Task.findOne({ name: req.body.name });
    if (existingTask) {
      res.status(400).json({ message: "Task already exists" });
    } else {
      const newTask = new Task({
        name: req.body.name,
      });
      await newTask.save();
      res.status(201).json({ message: "new task created" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/todos/name", async (req, res) => {
  try {
    const taskByName = await Task.findOne({ name: req.query.name });
    res.json(taskByName.name);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const taskToModify = await Task.findById(req.params.id);
    if (taskToModify) {
      taskToModify.name = req.body.name;
      await taskToModify.save();
      res.status(200).json({ message: "task successfully updated" });
    } else {
      res.status(400).json({ message: "task does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const taskToDelete = await Task.findByIdAndDelete(req.params.id);
    if (taskToDelete) {
      res.status(200).json({ message: "Task successfully deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server started");
});
