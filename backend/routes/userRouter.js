const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create-token", userController.createToken);

router.get("/", function (req, res) {
  return res.send("user routes");
});

module.exports = router;
