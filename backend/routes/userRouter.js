const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { set } = require("mongoose");
const { getUserDataByAccessToken } = require("../helpers");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL
);

router.post("/create-token", async function (req, res, next) {
  try {
    const { code } = req.body;
    const token = await oauth2Client.getToken(code);
    console.log(token.tokens.access_token);

    const data = getUserDataByAccessToken(token.tokens.access_token);
    userinfo = await data;
    console.log(userinfo.email);
    res.send(token);
  } catch (err) {
    res.send(err);
  }
});

router.get("/", function (req, res) {
  return res.send("user routes");
});

module.exports = router;
