const passport = require("passport");
const axios = require("axios");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (request, accessToken, refreshToken, profile, cd) {
      console.log("profile");
      cd(null, profile);
      // Use the access token to fetch the user's information from Google's API

      console.log("accessToken", accessToken);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
