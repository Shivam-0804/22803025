import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";

function NotificationCard({ notification, onRead, onDelete }) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{notification.title}</Typography>

        <Typography variant="body1" sx={{ marginY: 1 }}>
          {notification.message}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
          <Chip label={notification.type} />
          <Chip
            label={notification.read ? "Read" : "Unread"}
            color={notification.read ? "success" : "warning"}
          />
        </Stack>

        <Typography variant="caption" display="block">
          {new Date(notification.createdAt).toLocaleString()}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
          {!notification.read && (
            <Button
              variant="contained"
              onClick={() => onRead(notification._id)}
            >
              Mark Read
            </Button>
          )}

          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(notification._id)}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;
