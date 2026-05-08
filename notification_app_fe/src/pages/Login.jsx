import { Container, TextField, Button, Paper, Typography } from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { logInfo, logError } from "../utils/logger";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      logInfo("Login attempt started", "auth");

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      logInfo("Login successful", "auth");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      logError("Login failed", "auth");
      alert("Login failed");
    }
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={login}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
}

export default Login;
