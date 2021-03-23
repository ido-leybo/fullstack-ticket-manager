const { Router } = require("express");
const app = require("../app");
const tickets = require("./tickets");

const api = Router();

app.use("/tickets", tickets);

module.exports = api;
