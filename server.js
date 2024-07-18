const express = require("express");
const app = express();
const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/subscribers");
// const db = mongoose.connection;
// db.on("error", (err) => console.log(err));
// db.once("open", () => console.log("connected to database"));

// routes
app.get("/", (req, res) => {
  res.send("Hello Node API");
});

// start the express server

app.listen(3000, () => console.log("server started"));
