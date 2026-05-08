const jwt = require("jsonwebtoken");

async function protect(req, res, next) {
  let token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ success: false, message: "No token" });

  token = token.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = protect;
