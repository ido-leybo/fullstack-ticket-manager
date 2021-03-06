const { Router } = require("express");
const tickets = Router();
const Ticket = require("../models/ticket");

// get all tickets and with filtering of search
tickets.get("/", (req, res) => {
  const { searchText } = req.query;
  Ticket.find({ title: new RegExp(searchText, "i") }).then((data) => {
    res.json(data);
  });
});

// mark if the ticket is "done" or "undone"
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

// add new ticket
tickets.post("/", (req, res) => {
  const data = req.body;
  console.log(data);
  const ticket = new Ticket({
    title: data.title,
    content: data.content,
    userEmail: data.email,
    creationTime: new Date(),
    labels: data.labels.length > 0 ? data.labels : null,
  });
  ticket
    .save()
    .then(() => {
      res.status(200).redirect("/");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// delete and restore tickets
tickets.put("/:ticketId/:isDelete", (req, res) => {
  const ticketId = req.params.ticketId;
  const isDelete = req.params.isDelete;
  let deleteCard;
  if (isDelete === "delete") {
    deleteCard = true;
  } else if (isDelete === "restore") {
    deleteCard = false;
  } else {
    res.sendStatus(400);
  }

  Ticket.findByIdAndUpdate(ticketId, { delete: deleteCard }, { new: true })
    .then(() => {
      res.json({ deleted: true });
    })
    .catch(() => {
      res.send({ error: "ID Not Found" });
    });
});
module.exports = tickets;
