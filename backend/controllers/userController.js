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

    const data = getUserDataByAccessToken(token.tokens.access_token);
    userinfo = await data;

    // check if the user exist in the database and create new one if does not exist
    const user = findOrCreate(userinfo, token.tokens.refresh_token);
    const founduser = await user;
    res.send({ founduser });
    // res.send(token);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  createToken,
};
