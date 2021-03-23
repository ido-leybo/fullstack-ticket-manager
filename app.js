const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.static("client/build"));

app.use("/api", api);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

module.exports = app;
