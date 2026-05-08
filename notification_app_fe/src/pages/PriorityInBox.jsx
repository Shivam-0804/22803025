import { useEffect, useState } from "react";
import { Container, Typography, TextField } from "@mui/material";

import API from "../api/api";
import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import { getTopNotifications } from "../utils/priorityEngine";

function PriorityInbox() {
  const [notifications, setNotifications] = useState([]);
  const [limit, setLimit] = useState(5);

  async function fetchNotifications() {
    const res = await API.get("/notifications");
    setNotifications(res.data);
  }

  async function markRead(id) {
    await API.patch(`/notifications/${id}/read`);

    setNotifications((prev) =>
      prev.map((item) => (item._id === id ? { ...item, read: true } : item)),
    );
  }

  async function deleteNotification(id) {
    await API.delete(`/notifications/${id}`);

    setNotifications((prev) => prev.filter((item) => item._id !== id));
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications();
  }, []);

  const priorityNotifications = getTopNotifications(
    notifications,
    Number(limit),
  );

  return (
    <>
      <Navbar />

      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Priority Inbox
        </Typography>

        <TextField
          type="number"
          label="Top Notifications"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          sx={{ marginBottom: 3 }}
        />

        {priorityNotifications.map((item) => (
          <NotificationCard
            key={item._id}
            notification={item}
            onRead={markRead}
            onDelete={deleteNotification}
          />
        ))}
      </Container>
    </>
  );
}

export default PriorityInbox;
