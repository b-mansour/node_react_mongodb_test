const passport = require("passport");
const axios = require("axios");

// const User = require("./models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
      //   passReqToCallback: true,
    },
    async function (accessToken, refreshToken, profile, cb, done) {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });

      axios
        .get(process.env.GET_USER_DATA_URL + profile.access_token, {
          headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "application/json",
          },
        })
        .then(function (response) {
          // todo: create user
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          console.log("done");
        });

      console.log(profile);

      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
