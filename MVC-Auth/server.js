const express = require("express");
// Handles API requests and responses.
const app = express();
const mongoose = require("mongoose");
// Handles interaction with mongoDB
const passport = require("passport");
// Handles authentication
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// session with MongoStore manage user's login cookies
const flash = require("express-flash");
// Flashes notification for errors or invalid input.
const logger = require("morgan");
// Logs all requests
const connectDB = require("./config/database");
// Connecting to mongoDB
const mainRoutes = require("./routes/main");
// Link to mian route
const todoRoutes = require("./routes/todos");
// Link to todos route

require("dotenv").config({ path: "./.env" });
// Tell express to use the environment variables.

// Passport config
require("./config/passport")(passport);
// Tell our application to use passport authentication.

connectDB();
// Function call. 

app.set("view engine", "ejs");     // 
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Look at the requests comming through, and
app.use(express.json());                         // pull out the staff we need.
app.use(logger("dev"));   // 

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());    // Alerts flash pop-ups

app.use("/", mainRoutes);
app.use("/todos", todoRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
