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

function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
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

// router.post("/login", passport.authenticate('local', isAuthenticated));
router.post("/login", passport.authenticate("local", isAuthenticated), getMe);
// router.post('/login', 
//   passport.authenticate('local', { failureRedirect: 'login/failed' }),
//   function(req, res) {
//     res.redirect('/me');
//   });
// router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect('/')
})

// router.post('/login', passport.authenticate('local', { failureRedirect: '/login/failed', failureFlash: true }), function(req, res) {
//   res.redirect('me');
// });

// router.get('/', function(req, res) {
//   res.render('index', {user: req.user});
// });

// PUT REQUEST -> update login
router.get("/update", updateUser);

module.exports = router;