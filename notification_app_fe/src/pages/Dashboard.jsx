import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";

import API from "../api/api";
import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import { logInfo, logError } from "../utils/logger";

function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNotifications() {
    try {
      logInfo("Fetching notifications", "service");

      const res = await API.get("/notifications");

      setNotifications(res.data);

      logInfo("Notifications fetched", "service");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      logError("Notification fetch failed", "service");
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id) {
    try {
      await API.patch(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((item) => (item._id === id ? { ...item, read: true } : item)),
      );

      logInfo("Notification marked read", "service");
    } catch {
      logError("Mark read failed", "service");
    }
  }

  async function deleteNotification(id) {
    try {
      await API.delete(`/notifications/${id}`);

      setNotifications((prev) => prev.filter((item) => item._id !== id));

      logInfo("Notification deleted", "service");
    } catch {
      logError("Delete notification failed", "service");
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications();
  }, []);

  return (
    <>
      <Navbar />

      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : notifications.length === 0 ? (
          <Typography>No notifications</Typography>
        ) : (
          notifications
            .slice(0, 5)
            .map((item) => (
              <NotificationCard
                key={item._id}
                notification={item}
                onRead={markRead}
                onDelete={deleteNotification}
              />
            ))
        )}
      </Container>
    </>
  );
}

export default Dashboard;
