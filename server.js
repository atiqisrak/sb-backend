// Import required modules
const mongoose = require("mongoose"); // Add mongoose import
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Import and use API routes
const authRoutes = require("./routes/authRoutes");
const shopRoutes = require("./routes/shopRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Define a static directory to serve static files, such as images
app.use(express.static("public"));
app.use(express.json());

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    // Try connecting to MongoDB using Mongoose
    const conStringTest = process.env.Atlas_Con_String;
    await mongoose.connect(conStringTest, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas using Mongoose");

    // Use API routes
    app.use("/api/auth", authRoutes);
    app.use("/api/shops", shopRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/categories", categoryRoutes);

    // Start the server
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(
      "Failed to connect to MongoDB using Mongoose:",
      error.message
    );

    try {
      // If connection to Mongoose fails, fallback to Mongodb_Con_String from .env
      const conString = process.env.Mongodb_Con_String;
      await mongoose.connect(conString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB localhost");

      // Use API routes
      app.use("/api/auth", authRoutes);
      app.use("/api/shops", shopRoutes);
      app.use("/api/products", productRoutes);
      app.use("/api/categories", categoryRoutes);

      // Start the server
      const port = process.env.PORT || 4000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error(
        "Failed to connect to MongoDB using Mongodb_Con_String from .env:",
        error.message
      );
    }
  }
};

// Call the connectToMongoDB function to initiate the connection
connectToMongoDB();
