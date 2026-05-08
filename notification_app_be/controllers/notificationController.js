const Notification = require("../models/notification");

async function createNotification(req, res) {
  try {
    const { title, message, type } = req.body;
    const notification = await Notification.create({
      title,
      message,
      type,
      userId: req.user.id,
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
async function getNotifications(req, res) {
  try {
    const notifications = await Notification.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function markAsRead(req, res) {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    notification.read = true;

    await notification.save();

    res.json(notification);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
};
