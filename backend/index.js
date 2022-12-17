const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes");
const app = express();
var cors = require("cors");

app.use(express.json());
app.use(session({ secret: "cats" }));
app.use(cors());

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
  res.send("Welcome  google calendar kanban apis");
});

app.use("/users", routes.userRouter);
app.use("/events", routes.listItemRouter);
