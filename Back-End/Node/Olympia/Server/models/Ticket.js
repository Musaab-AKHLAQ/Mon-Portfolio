const mongoose = require("mongoose");

const Ticket = mongoose.model("Ticket", {
  email: String,
  userName: String,
  date: Date,
  category: String,
  seats: Number,
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});

module.exports = Ticket;
