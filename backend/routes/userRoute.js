const express = require("express");
const router = express.Router();
const passport = require("../config/passport")
const { getMe, registerUser, loginUser, updateUser } = require("../controllers/userController");


// const CLIENT_URL = "http://localhost:3000/chat"
const CLIENT_URL = "me"
const CLIENT_URL_FAILED = "login/failed"
const isAuthenticated = {
  successRedirect: CLIENT_URL,
  failureRedirect: CLIENT_URL_FAILED,
}

// GET REQUEST -> get user profile
router.get("/me", getMe);


router.get("/login/failed", (req, res) => {
  console.log('failed to login at route login/failed')
  res.status(401).send("failed auth")
});

// POST REQUEST -> register
router.post("/register", registerUser);

// POST REQUEST -> login
router.post("/login", passport.authenticate("local", isAuthenticated), getMe);
// router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect('/')
})

// PUT REQUEST -> update login
router.get("/update", updateUser);

// GOOGLE STRATEGY EXAMPLE
router.get('/auth/google',
  passport.authenticate('google'));

router.get('/auth/google/callback',
  passport.authenticate('oauth2', { scope: 'profile', failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;