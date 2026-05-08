const express = require("express");
const notRoute = express.Router();
const protect = require("../middleware/auth");
const {
  createNotification,
  getNotifications,
  markAsRead
} = require("../controllers/notificationController");

notRoute.post("/", protect, createNotification);
notRoute.get("/", protect, getNotifications);
notRoute.patch("/:id/read", protect, markAsRead);

module.exports = notRoute;