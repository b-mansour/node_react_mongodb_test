const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { getUserDataByAccessToken, findOrCreate } = require("../helpers");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL
);

// const oauth2Client = new google.auth.OAuth2({
//   clientId: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   redirectUri: process.env.REDIRECT_URL,
// });

router.post("/create-token", async function (req, res, next) {
  try {
    const { code } = req.body;
    const token = await oauth2Client.getToken(code);
    // res.json(token);

    // Get the user information by access token
    const data = getUserDataByAccessToken(token.tokens.access_token);
    userinfo = await data;
    // console.log(userinfo);
    // check if the user exist in the database and create new one if does not exist
    const user = findOrCreate(userinfo, token.tokens.refresh_token);
    const founduser = await user;
    // console.log(founduser);
    res.send({ founduser });
    // res.send(token);
  } catch (err) {
    res.send(err);
  }
});

router.get("/", function (req, res) {
  return res.send("user routes");
});

module.exports = router;
