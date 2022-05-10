const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const {
  getProfile,
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");

// const CLIENT_URL = "http://localhost:3000/chat"
const CLIENT_URL = "profile";
const CLIENT_URL_FAILED = "login/failed";
const redirectTo = {
  // successRedirect: CLIENT_URL,
  failureRedirect: CLIENT_URL_FAILED,
};

// GET REQUEST -> get user profile
router.get("/profile", getProfile);

router.get("/login/failed", (req, res) => {
  console.log("failed to login at route login/failed");
  // console.log(req)
  res.status(401).send("failed auth");
});

// POST REQUEST -> register
router.post("/register", registerUser);

// POST REQUEST -> login
// router.post("/login", passport.authenticate("local", redirectTo), getProfile);
router.post("/login", passport.authenticate("local", redirectTo), getProfile);
// router.post("/login", passport.authenticate("local", redirectTo), (req, res) => {
//   res.redirect("http://localhost:3000/profile");
// });
// router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  console.log(req.user)
  if(req.user) {
    console.log('logging out')
    req.logout();
    res.send("logged out successful")
  }
  // res.redirect("/");
});

// PUT REQUEST -> update login
router.get("/update", updateUser);

// GOOGLE STRATEGY EXAMPLE
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "login/failed" }),
  function (req, res) {
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
);


module.exports = router;
