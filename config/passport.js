const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

// Passport configuration
passport.use(
  new LocalStrategy(
    {
      // Specify the field names for the phone number and password in the request body
      usernameField: "contactNumber",
      passwordField: "password",
    },
    async (contactNumber, password, done) => {
      try {
        // Find the user in the database based on the provided phone number
        const user = await User.findOne({ contactNumber });

        // If user not found, return an error message
        if (!user) {
          return done(null, false, { message: "Invalid phone number" });
        }

        // Check if the password is correct
        const isMatch = await user.comparePassword(password);

        // If password is incorrect, return an error message
        if (!isMatch) {
          return done(null, false, { message: "Invalid password" });
        }

        // If phone number and password are correct, return the user object
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user objects for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
