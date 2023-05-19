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
    function (request, accessToken, refreshToken, profile, cb) {
      // console.log("profile");
      return cb(null, profile);
      // Use the access token to fetch the user's information from Google's API

      console.log("accessToken", accessToken);

      // axios
      //   .get("https://www.googleapis.com/oauth2/v2/userinfo", {
      //     headers: {
      //       Authorization: "Bearer " + accessToken,
      //     },
      //   })
      //   .then((response) => {
      //     console.log("response", response);
      //     const userData = response.data;
      //     // You can now use the user's information to create or update their account in your application's database
      //     // Call the `cb` function with the user's data to complete the authentication process
      //     cb(null, userData);
      //   })
      //   .catch((error) => {
      //     cb(error);
      //   });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
