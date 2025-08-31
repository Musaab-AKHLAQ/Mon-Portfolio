const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

router.post("/events/create", async (req, res) => {
  try {
    const newEvent = new Event({
      name: req.body.name,
      date: req.body.date,
      seats: {
        orchestre: req.body.seats.orchestre,
        mezzanine: req.body.seats.mezzanine,
      },
    });
    await newEvent.save();
    res.status(200).json({ message: "Event successfully created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/events/date", async (req, res) => {
  try {
    const eventsByDate = await Event.find({ date: req.query.date });
    res.status(200).json(eventsByDate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/events/:id", async (req, res) => {
  try {
    const eventById = await Event.findById(req.params.id);
    if (eventById) {
      res.status(200).json(eventById);
    } else {
      res.status(400).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { date, name, orchestre, mezzanine } = req.body;
    const eventToModify = {};
    if (date) eventToModify.date = date;
    if (name) eventToModify.name = name;
    if (orchestre) eventToModify.seats.orchestre = orchestre;
    if (mezzanine) eventToModify.seats.mezzanine = mezzanine;
    const eventUpdated = await Event.findByIdAndUpdate(eventId, eventToModify, {
      new: true,
    });
    res.status(200).json(eventUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/events/:id", async (req, res) => {
  try {
    const eventToDelete = await Event.findByIdAndDelete(req.params.id);
    if (!eventToDelete) {
      return res.status(400).json({ message: "Event not found" });
    }
    await Ticket.deleteMany({ event: req.params.id });
    res.status(200).json({
      message: "Event and all tickets linked to it have been deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
