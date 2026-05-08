import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

import API from "../api/api";
import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortType, setSortType] = useState("latest");

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

  let filtered = [...notifications];

  if (filterType !== "all") {
    filtered = filtered.filter((item) => item.type === filterType);
  }

  filtered.sort((a, b) =>
    sortType === "latest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt),
  );

  return (
    <>
      <Navbar />

      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Notifications
        </Typography>

        <FilterBar
          filterType={filterType}
          setFilterType={setFilterType}
          sortType={sortType}
          setSortType={setSortType}
        />

        {filtered.map((item) => (
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

export default AllNotifications;
