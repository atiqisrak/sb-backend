const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

// Controller method for fetching all users
exports.getUsers = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find(
      {},
      "name contactNumber nid registrationNumber createdAt"
    );

    // Return response with users data
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in getUsers:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller method for fetching a user by ID
exports.getUser = async (req, res) => {
  try {
    // Extract user ID from request params
    const userId = req.params.userId;

    // Find user by ID
    const user = await User.findById(
      userId,
      "name contactNumber nid registrationNumber createdAt"
    );

    // If user not found, return error response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return response with user data
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        contactNumber: user.contactNumber,
        nid: user.nid,
        registrationNumber: user.registrationNumber,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller method for creating a new user
exports.createUser = async (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, contactNumber, password, nid, registrationNumber } = req.body;

  try {
    // Check if a user with the same contactNumber or nid already exists
    let user = await User.findOne({ $or: [{ contactNumber }, { nid }] });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object
    user = new User({
      name,
      contactNumber,
      password: hashedPassword,
      nid,
      registrationNumber,
      createdAt: new Date(),
    });

    // Save user to the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return response with user data and token
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        contactNumber: user.contactNumber,
        nid: user.nid,
        registrationNumber: user.registrationNumber,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller method for updating a user by ID
exports.updateUser = async (req, res) => {
  try {
    // Extract user ID from request params
    const userId = req.params.userId;

    // Validate incoming request body data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password, if provided
    let hashedPassword;
    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }

    // Update user data
    user.name = req.body.name || user.name;
    user.contactNumber = req.body.contactNumber || user.contactNumber;
    user.password = hashedPassword || user.password;
    user.nid = req.body.nid || user.nid;
    user.registrationNumber =
      req.body.registrationNumber || user.registrationNumber;
    user.createdAt = user.createdAt;

    // Save updated user data
    const updatedUser = await user.save();

    // Generate new JWT token with updated user data
    const token = jwt.sign(
      { userId: updatedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return response with updated user data and new JWT token
    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        contactNumber: updatedUser.contactNumber,
        nid: updatedUser.nid,
        registrationNumber: updatedUser.registrationNumber,
        createdAt: updatedUser.createdAt,
      },
      token,
    });
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller method for deleting a user by ID
exports.deleteUser = async (req, res) => {
  try {
    // Extract user ID from request params
    const userId = req.params.userId;

    // Find user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    // If user not found, return error response
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return response with deleted user data
    res.status(200).json({
      message: "User deleted successfully",
      user: {
        id: deletedUser._id,
        name: deletedUser.name,
        contactNumber: deletedUser.contactNumber,
        nid: deletedUser.nid,
        registrationNumber: deletedUser.registrationNumber,
        createdAt: deletedUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// Controller method for user sign-in
exports.signInUser = async (req, res) => {
  const { contactNumber, password } = req.body;

  try {
    // Find user by contact number
    const user = await User.findOne({ contactNumber });

    // If user not found, return error response
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return response with user data and token
    res.status(200).json({
      message: "User signed in successfully",
      user: {
        id: user._id,
        name: user.name,
        contactNumber: user.contactNumber,
        nid: user.nid,
        registrationNumber: user.registrationNumber,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.error("Error in signInUser:", error);
    res.status(500).json({ error: "Server error" });
  }
};
