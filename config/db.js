const mongoose = require("mongoose");

const conString = process.env.Mongodb_Con_String;
// Connect to MongoDB using Mongoose
mongoose
  .connect(conString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

module.exports = mongoose;
