const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
// Import user controller methods
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  signInUser,
} = require("../controllers/authController");

// Define routes for fetching user information, creating a new user, updating user information, and deleting a user
router.get("/:userId", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.post(
  "/signin",
  [
    check(
      "contactNumber",
      "Please enter a valid contact number"
    ).isMobilePhone(),
    check("password", "Please enter a password").notEmpty(),
  ],
  signInUser
);

module.exports = router;
