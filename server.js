require("dotenv").config();
const express = require("express");
const app = express();
// Routes
const homeRoutes = require("./routes/home");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });
app.use("/", homeRoutes);

app.listen(process.env.PORT || 2022, () => {
  console.log("Server is running on port: ", process.env.PORT || 2022);
});
