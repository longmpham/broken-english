const passport = require("passport");
const UserModel = require("../../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

/*********************************************
                 GOOGLE STRATEGY
**********************************************/
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/api/users/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(profile)
//       // UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
//       UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
//         console.log("i found a user: ")
//         console.log(user)
//         return cb(err, user);
//       });
//     }
//   )
// );
passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
    },
    // updated with async await
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      try {
        const user = await UserModel.findOne({ googleId: profile.id });
        console.log(user)
        if (!user) {
          const newUser = await UserModel({
            googleId: profile.id,
            // todo: find items to save from profile (IF NECESSARY?)
            username: profile.name.givenName + " " + profile.name.familyName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          });
          const result = await newUser.save();
          console.log("newUser saved:");
          // console.log(result);
          return cb(null, newUser);
        } else {
          console.log("we found a google profile:");
          // todo: update user info if needed
          const result = await user.updateOne({
            googleId: profile.id,
            username: profile.name.givenName + " " + profile.name.familyName,
            email: profile.emails[0].value,
            // todo: if no photo, use generic (value ? photo : stockphoto)
            photo: profile.photos[0].value,
          });
          console.log("updated user: " + result.acknowledged);
          // console.log(result);

        }
        cb(null, user);
      } catch (error) {
        console.log(error);
        cb(error, null);
      }
    }
    // (accessToken, refreshToken, profile, cb) => {
    //   console.log(profile)
    //   UserModel.findOne({ googleId: profile.id }, async (err, user) => {
    //     if (err) {
    //       return cb(err, null);
    //     }
    //     if (!user) {
    //       const newUser = await UserModel({
    //         googleId: profile.id,
    //         username: profile.name.givenName,
    //         email: profile.emails[0].value,
    //       });
    //       await newUser.save();
    //       console.log('newUser saved:')
    //       console.log(newUser)
    //     }
    //   });
    //   console.log('profile:')
    //   console.log(profile)
    //   cb(null, profile);
    // }
  )
);

module.exports = passport;