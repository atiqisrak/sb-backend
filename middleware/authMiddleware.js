const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");

// Middleware for authenticating and authorizing user
const authenticateUser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("x-auth-token");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, config.jwtSecret);
    // Attach the decoded user object to the request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

// Middleware for checking if user is an admin
const isAdmin = (req, res, next) => {
  // Check if user is an admin
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden. User is not an admin." });
  }
  next();
};

module.exports = {
  authenticateUser,
  isAdmin,
};
