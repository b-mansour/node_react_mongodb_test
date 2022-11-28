const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@nodereactmongodbtest.htsqafd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(db)
  .then((results) =>
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    })
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/createuser", (req, res) => {
  const user = new User({
    name: "Basher",
    email: "b.mans77zh@gmail.com",
    password: "12345678",
  });

  user
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get("/allusers", (req, res) => {
  const users = User.find()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get("/finduser", (req, res) => {
  const user = User.findById("6383cabd5a5ecc61d2f83bdc")
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});
