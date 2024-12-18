const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
function authenticateToken(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    if (requiredRole && user.role !== requiredRole) {
      return res
        .status(403)
        .json({ error: "Access denied: Insufficient permissions." });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
