async function sendLog(level, packageName, msg) {
  try {
    await fetch("http://localhost:3000/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stack: "frontend",
        level,
        packageName,
        msg
      })
    });
  } catch (err) {
    console.error("Logging failed:", err);
  }
}
export function logInfo(msg, packageName = "utils") {
  sendLog("info", packageName, msg);
}
export function logDebug(msg, packageName = "utils") {
  sendLog("debug", packageName, msg);
}
export function logWarn(msg, packageName = "utils") {
  sendLog("warn", packageName, msg);
}
export function logError(msg, packageName = "utils") {
  sendLog("error", packageName, msg);
}