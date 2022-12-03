const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/", eventController.getAllEvents);

router.post("/add-events", eventController.addEvents);

router.get("/all-user-events", eventController.getAllUserEvents);

module.exports = router;
