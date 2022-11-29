const passport = require("passport");
const axios = require("axios");
const User = require("./models/User");

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

      // console.log(profile);

      axios
        .get(process.env.GET_USER_DATA_URL + profile.access_token, {
          headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "application/json",
          },
        })
        .then(function (response) {
          console.log(response);
          findOrCreate(response.data.email);
        })
        .catch(function (error) {
          console.log(error);
        });

      // console.log(profile);

      async function findOrCreate(email) {
        const user = await User.findOne({
          email: email,
        });

        if (user === null) {
          const user = new User({
            name: email,
            email: email,
            password: "12345678",
          });

          user
            .save()
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
        } else {
          // console.log(user);
        }
      }

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
