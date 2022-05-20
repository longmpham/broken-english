const passport = require("../config/passport/passport");

const checkAuthentication = (req, res, next) => {
  if(req.isAuthenticated()) {
    console.log('user is authenticated! you may continue')
    next()
  } else {
    console.log('not authenticated')
    // res.redirect("http://localhost:3000/login");
    res.status(401).send({success: false, message: "not authenticated. moving to login page"});
  }
}

module.exports = checkAuthentication;