const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require('express-session');
const authController = require("../controllers/authController");


router.post("/login", passport.authenticate('local', {failureMessage: 'User is not authenticated'}), (req, res) => {
  // const sess = req.session;
  // const { username, password } = req.body;
  // sess.username = username;
  // sess.password = password;
  // authController.verifyUser,
  return res.status(200).json(req.user);
});

router.get("/google",
    passport.authenticate('google', { scope: ['email', 'profile'] }),
    (req, res) => {
      return res.sendStatus(200);
})

router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/register' }), (req, res) => {
  // successful authenication, redirect to dashboard/homepage
  // return res.status(200).json(req.user)
  if (process.env.NODE_ENV === 'production') {
    return res.status(200).redirect('http://localhost:3000/');
  } else {
    return res.status(200).redirect(`http://localhost:8080/`);
  }
})

router.post("/register", authController.createUser, (req, res) => {
  return res.status(200).send('Account creation success');
});

router.post("/logout", authController.logout, (req, res) => {
  req.session.destroy((err) => {
    console.log('DESTROYING ALL SESSIONS')
    if(err) {
      return console.log(err)
    }
  })
  return res.sendStatus(200);
});

router.get('/user', authController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user)
});

module.exports = router;
