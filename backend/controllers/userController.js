const express = require("express");
const { google } = require("googleapis");
const { getUserDataByAccessToken, findOrCreate } = require("../helpers");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const createToken = async function (req, res, next) {
  try {
    const { code } = req.body;
    const token = await oauth2Client.getToken(code);
    // res.json(token);

    const userinfo = await getUserDataByAccessToken(token.tokens.access_token);

    // check if the user exist in the database and create new one if does not exist
    const founduser = await findOrCreate(userinfo, token.tokens.refresh_token);
    res.send({ founduser });
    // res.send(token);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  createToken,
};
