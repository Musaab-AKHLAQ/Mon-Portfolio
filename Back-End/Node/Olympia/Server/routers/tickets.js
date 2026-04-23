const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

router.post("/tickets/create", async (req, res) => {
  try {
    if (
      req.body.seats > 4 ||
      req.body.seats < 1 ||
      (req.body.category !== "orchestre" && req.body.category !== "mezzanine")
    ) {
      // vérification des limitations des sièges et le nom des catégories des sièges

      return res.status(400).json({ message: "Invalid request" });
    }

    const event = await Event.findById(req.body.eventId); // vérification de l'ID de l'événement

    if (!event) {
      return res.status(400).json({ message: "Event not found" });
    }

    const eventDate = event.date; // date de l'événement avec la variable event deja récupérer avant donc pas besoin de refaire une nouvelle variable avec await et récuperation de donnée de la base de donnée
    const currentDate = new Date(); // récupération de date et heure actuelle avec méthode new Date()

    if (currentDate > eventDate) {
      //deuxième méthode:  if (isAfter(new Date(), new Date(event.date)))
      return res
        .status(400)
        .json({ message: "The booking for this event has passed " });
    }

    const availableSeats = event.seats[req.body.category]; // vérification de catégorie de place
    if (availableSeats < req.body.seats) {
      //vérification de place disponible pour catégorie choisie
      return res
        .status(400)
        .json({ message: "Not enough available seats for this category" });
    }

    event.seats[req.body.category] = availableSeats - req.body.seats;
    await event.save();

    {
      const newTicket = new Ticket({
        eventId: req.body.eventId,
        email: req.body.email,
        userName: req.body.username,
        category: req.body.category,
        seats: req.body.seats,
        date: new Date(),
      });
      await newTicket.save();
      res
        .status(201)
        .json({ message: `${req.body.seats} seats successfully booked` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/tickets/:email", async (req, res) => {
  try {
    const eventByEmail = await Ticket.find({
      email: req.params.email,
    }).populate("event");

    if (eventByEmail.length > 0) {
      res.status(200).json(eventByEmail);
    } else {
      res
        .status(400)
        .json({ message: "No reservation founded for this email" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/tickets/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ticketToDelete = await Ticket.findByIdAndDelete(id);
    const eventToUpdate = await Event.findById(ticketToDelete.event);
    eventToUpdate.seats[ticketToDelete.category] += ticketToDelete.seats;
    await eventToUpdate.save();
    res.status(200).json({ message: "Ticket cancelled and event updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
