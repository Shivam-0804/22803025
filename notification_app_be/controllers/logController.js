const { Log } = require("../../logging_middleware");
const TOKEN = process.env.LOG_TOKEN;
async function proxyLog(req, res) {
  try {
    const { stack, level, packageName, message } = req.body;

    if (!stack || !level || !packageName || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required log fields",
      });
    }

    await Log(stack, level, packageName, message, TOKEN);

    res.status(200).json({
      success: true,
      message: "Log forwarded successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Log forwarding failed",
      error: err.message,
    });
  }
}

module.exports = proxyLog;
