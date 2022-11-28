const express = require("express");
const router = express.Router();

router.get("/login", function (req, res) {
  return res.send("user routes");
});

router.get("/", function (req, res) {
  return res.send("user routes");
});

module.exports = router;
