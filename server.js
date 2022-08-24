require("dotenv").config();
// require('dotenv').config({path: './config/.env'})
const express = require("express");
const app = express();
// Routes
const homeRoutes = require("./routes/home");
const connectDB = require("./config/database");
connectDB();

app.set("view engine", "ejs");
app.use(express.static("public")); // 'public' folder hosts static files.
app.use(express.urlencoded({ extended: true })); // parses the request body.
app.use(express.json());

// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });

// Separating different rotes.
app.use("/", homeRoutes);

app.listen(process.env.PORT || 2022, () => {
  console.log("Server is running on port: ", process.env.PORT || 2022);
});
