const express = require("express");
const router = express.Router();
const passport = require("../config/passport/passport");

const successfulRedirect = (req, res) => {
    // console.log(req)
    // res.status(201).send({
    //   success: true,
    //   message: "user has successfully authenticated",
    //   cookies: req.session,
    //   user: req.user,
    // });
    // Successful authentication, redirect home.
  res.redirect("http://localhost:3000/profile");
}

// i don't think this code piece is needed but redirect for failures 
// show that this should be used. I can't find a way to test it.
router.get("/login/failed", (req, res) => {
  console.log("failed to login at route login/failed");
  // console.log(req)
  res.status(401).send("failed auth");
});


/*********************************************
                 GOOGLE STRATEGY
**********************************************/
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "login/failed" }),
  successfulRedirect
);
/*********************************************
                 GITHUB STRATEGY
**********************************************/
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user"] })
);
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "login/failed" }),
  successfulRedirect
);

/*********************************************
                 FACEBOOK STRATEGY
**********************************************/
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "login/failed" }),
  successfulRedirect
);

/*********************************************
                 TWITTER STRATEGY
**********************************************/
router.get(
  "/auth/twitter",
  passport.authenticate("twitter")
);
router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "login/failed" }),
  successfulRedirect
);

module.exports = router;
