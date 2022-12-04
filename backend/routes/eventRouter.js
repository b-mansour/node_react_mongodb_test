const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/", eventController.getAllEvents);

router.post("/add-events", eventController.addEvents);

router.get("/all-user-events", eventController.getAllUserEvents);

router.post("/change-event-column", eventController.changeEventColumn);

module.exports = router;
