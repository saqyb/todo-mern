const dotenv = require("dotenv");
// const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");

// const User = require("./model/userSchema");

app.use(express.json());
app.use(require("./router/auth"));
const PORT = process.env.PORT;

app.get("/contact", (req, res) => {
  res.cookie("Test", "OREO");
  res.send("Contact Page From the Server");
});

app.get("/signup", (req, res) => {
  res.send("Signup Page From the Server");
});

app.get("/signin", (req, res) => {
  res.send("Signin From the Server");
});

console.log("Hello");

app.listen(PORT, () => {
  console.log("Server is running @ Port " + PORT);
});
