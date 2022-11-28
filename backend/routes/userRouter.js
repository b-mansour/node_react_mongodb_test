const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  return res.send("user routes");
});

module.exports = router;
