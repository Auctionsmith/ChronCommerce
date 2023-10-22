const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");


router.post("/login", passport.authenticate('local', {failureMessage: 'User is not authenticated'}), (req, res) => {
  // authController.verifyUser,
  return res.status(200).json(req.user);
});

router.post("/register", authController.createUser, (req, res) => {
  return res.status(200).send('Account creation success');
});

router.get("/logout", authController.logout, (req, res) => {
  return res.sendStatus(200);
});

router.get('/user', authController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user)
});

module.exports = router;
