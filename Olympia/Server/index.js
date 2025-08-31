const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/olympia");

const eventsRouters = require("./routers/events");
app.use(eventsRouters);

const ticketsRouters = require("./routers/tickets");
app.use(ticketsRouters);

app.listen(3000, () => {
  console.log("Server has started ! 🚀🚀");
});
