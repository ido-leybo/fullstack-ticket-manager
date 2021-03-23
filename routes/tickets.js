const { Router } = require("express");
const tickets = Router();
const Ticket = require("../models/ticket");

tickets.get("/", (req, res) => {
  const { searchText } = req.query;
  Ticket.find({ title: new RegExp(searchText, "i") }).then((data) => {
    res.json(data);
  });
});

tickets.patch("/:ticketId/:isDone", (req, res) => {
  const id = req.params.ticketId;
  const isDone = req.params.isDone;
  if (isDone === "done") {
    Ticket.findByIdAndUpdate(id, { done: true }, { new: true })
      .then(() => {
        res.json({ updated: true });
      })
      .catch(() => {
        res.send({ error: "ID Not Found" });
      });
  } else if (isDone === "undone") {
    Ticket.findByIdAndUpdate(id, { done: false }, { new: true })
      .then(() => {
        res.json({ updated: true });
      })
      .catch(() => {
        res.send({ error: "ID Not Found" });
      });
  } else {
    res.status(400).send({ Error: "Illegal request" });
  }
});

module.exports = tickets;
