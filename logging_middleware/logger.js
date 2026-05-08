const axios = require("axios");

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

const VALID_STACKS = ["backend", "frontend"];

const VALID_LEVELS = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal"
];
const VALID_PACKAGES = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
  "auth",
  "config",
  "middleware",
  "utils"
];

async function Log(stack, level, packageName, message, token) {
  try {
    if (!VALID_STACKS.includes(stack)) {
      throw new Error("Invalid stack");
    }

    if (!VALID_LEVELS.includes(level)) {
      throw new Error("Invalid level");
    }

    if (!VALID_PACKAGES.includes(packageName)) {
      throw new Error("Invalid package");
    }

    const payload = {
      stack,
      level,
      package: packageName,
      message
    };

    const response = await axios.post(LOG_API, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;

  } catch (error) {
    console.error("Log failed:", error.response?.data || error.message);
  }
}

module.exports = { Log };