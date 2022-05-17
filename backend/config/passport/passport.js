const passport = require("passport");
const UserModel = require("../../models/user");

// old and used for testing pre id catching
// passport.serializeUser((user, done) => {
//   // done(null, user.id);
//   done(null, user);
// });

// // passport.deserializeUser((id, done) => {
// //   UserModel.findById({ id: id }, (err, user) => {
// //   // UserModel.findById(id, (err, user) => {
// //     done(err, user);
// //   });
// // });
// passport.deserializeUser((user, done) => {
//   done(null, user)
// });

passport.serializeUser((user, done) => {
  // console.log(user)
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  // learn tip: saves to req.user essentially because of passport.session() middleware.
  // console.log(id)

  const currentUser = await UserModel.findOne({ _id: id });
  // console.log(currentUser)
  done(null, currentUser);
});

// copy and pasted to new file for readability.
require("./localPassport")
require("./googlePassport")
require("./githubPassport")
require("./facebookPassport")
require("./twitterPassport")

module.exports = passport;
