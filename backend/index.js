const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const User = require("./models/User");
const passport = require("passport");
require("dotenv").config();
const routes = require("./routes");
const app = express();
var cors = require("cors");

require("./auth");
app.use(express.json());
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

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

app.use("/users", routes.userRouter);
app.use("/events", routes.listItemRouter);

app.get("/", (req, res) => {
  res.send('<a href= "/auth/google"> Authenticate with google </a>');
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send("Welcome you are logged in");
});

app.get("/auth/failure", (req, res) => {
  res.send("Something went wrong");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.get("/logout", function (req, res) {
  req.logout();
  res.send("logged out");
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/createuser", (req, res) => {
//   const user = new User({
//     name: "Basher",
//     email: "b.mans77zh@gmail.com",
//     password: "12345678",
//   });

//   user
//     .save()
//     .then((result) => res.send(result))
//     .catch((err) => res.send(err));
// });

// app.get("/allusers", (req, res) => {
//   const users = User.find()
//     .then((result) => res.send(result))
//     .catch((err) => res.send(err));
// });

// app.get("/finduser", (req, res) => {
//   const user = User.findById("6383cabd5a5ecc61d2f83bdc")
//     .then((result) => res.send(result))
//     .catch((err) => res.send(err));
// });
