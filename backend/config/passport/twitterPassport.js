const passport = require("passport");
const UserModel = require("../../models/user");
// const TwitterStrategy = require("passport-twitter").Strategy;
const TwitterStrategy = require("passport-twitter-oauth2.0")

/*********************************************
                 TWITTER STRATEGY
**********************************************/
passport.use(
  new TwitterStrategy(
    {
      clientID: `${process.env.TWITTER_CLIENT_ID}`,
      clientSecret: `${process.env.TWITTER_CLIENT_SECRET}`,
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
            username: profile.username,
            // email: profile.emails[0].value,
            email: profile.emails ? profile.emails[0].value : null,
            // photo: profile.profile_image_url,
          });
          const result = await newUser.save();
          console.log("newUser saved:");
          // console.log(result);
          return cb(null, newUser);
        } else {
          console.log("we found a twitter profile:");
          // todo: update user info if needed
          const result = await user.updateOne({
            twitterId: profile.id,
            username: profile.username,
            // email: profile.emails[0].value,
            email: profile.emails ? profile.emails[0].value : null,
            // todo: if no photo, use generic (value ? photo : stockphoto)
            // photo: profile.profile_image_url,
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