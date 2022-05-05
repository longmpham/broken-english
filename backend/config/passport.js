const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById({ _id: id }, (err, user) => {
    done(err, user);
  });
});
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://www.example.com/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   })
// );

// fun fact: bcrypt returns a promise so when the comparison happens without
// async, it always passes... TLDR bcrypt needs asycn/await
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//     },
//     function (username, password, done) {
//       UserModel.findOne({ email: username }, async function (err, user) {
//         console.log(user);
//         console.log(username, password)
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false, { message: "Incorrect username." });
//         }
//         const match = await bcrypt.compare(password, user.password)
//         if (!match) {
//           return done(null, false, { message: "Incorrect password." });
//         }
//         return done(null, user);
//       });
//     }
//   )
// );

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        console.log(email, password);
        const user = await UserModel.findOne({ email });
        console.log(user);
        if (!user) {
          return done(null, false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        // If not, handle it
        if (!isMatch) {
          return done(null, false);
        }
        console.log(user);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

module.exports = passport;
