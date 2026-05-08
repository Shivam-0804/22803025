const express = require("express");
const LogRoute = express.Router();

const proxyLog = require("../controllers/logController");
LogRoute.post("/", proxyLog);

module.exports = LogRoute;