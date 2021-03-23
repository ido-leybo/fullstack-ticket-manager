const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  creationTime: {
    type: Date,
    require: true,
  },
  labels: {
    type: [String],
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
