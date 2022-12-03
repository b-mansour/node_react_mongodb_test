const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/", eventController.getAllEvents);

router.post("/add-events", eventController.addEvents);

module.exports = router;
