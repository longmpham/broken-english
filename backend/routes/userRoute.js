const express = require("express");
const router = express.Router();
const passport = require("../config/passport/passport");
const checkAuthentication = require('../middleware/authentication')
const {
  getProfile,
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");

// GET REQUEST -> get user profile
router.get("/profile", checkAuthentication, getProfile);

// PUT REQUEST -> update login

router.post("/update", checkAuthentication, updateUser);
// router.post("/update", updateUser);


router.get("/login/failed", (req, res) => {
  console.log("failed to login at route login/failed");
  // console.log(req)
  res.status(401).send("failed auth");
});

// POST REQUEST -> register
router.post("/register", registerUser);

// POST REQUEST -> login
// router.post("/login", passport.authenticate("local", redirectTo), getProfile);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "login/failed" }),
  getProfile
);
// router.post("/login", passport.authenticate("local", redirectTo), (req, res) => {
//   res.redirect("http://localhost:3000/profile");
// });
// router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  console.log(req.user);
  if (req.user) {
    console.log("logging out");
    req.logout();
    res.send("logged out successful");
  }
  // res.redirect("/");
});

module.exports = router;
