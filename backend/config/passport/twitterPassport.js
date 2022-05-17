const passport = require("passport");
const UserModel = require("../../models/user");
const TwitterStrategy = require("passport-twitter").Strategy;

/*********************************************
                 TWITTER STRATEGY
**********************************************/
passport.use(
  new TwitterStrategy(
    {
      consumerKey: `${process.env.TWITTER_CLIENT_ID}`,
      consumerSecret: `${process.env.TWITTER_CLIENT_SECRET}`,
      callbackURL: "/auth/twitter/callback",
    },
    // updated with async await
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      try {
        const user = await UserModel.findOne({ twitterId: profile.id });
        if (!user) {
          const newUser = await UserModel({
            twitterId: profile.id,
            // todo: find items to save from profile (IF NECESSARY?)
            username: profile.name.givenName + " " + profile.name.familyName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          });
          const result = await newUser.save();
          console.log("newUser saved:");
          // console.log(result);
          cb(null, newUser);
        } else {
          console.log("we found a twitter profile:");
          // todo: update user info if needed
          const result = await user.updateOne({
            twitterId: profile.id,
            username: profile.name.givenName + " " + profile.name.familyName,
            email: profile.emails[0].value,
            // todo: if no photo, use generic (value ? photo : stockphoto)
            photo: profile.photos[0].value,
          });
          console.log("updated user: " + result.acknowledged);
          console.log(result);

        }
        cb(null, user);
      } catch (error) {
        console.log(error);
        cb(error, null);
      }
    }
  )
);

module.exports = passport;