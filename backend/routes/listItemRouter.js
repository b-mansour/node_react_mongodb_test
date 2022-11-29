const express = require("express");
const router = express.Router();
const listItemController = require("../controllers/listItemController");

router.get("/", listItemController.getAlllistItmes);

module.exports = router;
