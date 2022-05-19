const passport = require("passport");
const UserModel = require("../../models/user");
const GitHubStrategy = require("passport-github2").Strategy;

/*********************************************
                 GITHUB STRATEGY
**********************************************/
passport.use(
  new GitHubStrategy(
    {
      clientID: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
      callbackURL: "/auth/github/callback",
    },
    // updated with async await
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      try {
        const user = await UserModel.findOne({ githubId: profile.id });
        if (!user) {
          const newUser = await UserModel({
            githubId: profile.id,
            // todo: find items to save from profile (IF NECESSARY?)
            username: profile.username,
            // email: profile.emails[0].value,
            email: profile.emails ? profile.emails[0].value : null,
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
            githubId: profile.id,
            username: profile.username,
            email: profile.emails ? profile.emails[0].value : null,
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
