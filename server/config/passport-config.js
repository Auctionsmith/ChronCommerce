const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const { User, Auction, followedAuctions } = require('../db/models.js');

module.exports = function () {
  passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({where: {email: username}})
      .then((foundUser) => {
        if(!foundUser) { return done(null, false, {message: 'Incorrect username or password'}) }
        // if(foundUser.password !== password) { return done(null, false, {message: 'Incorrect username or password'}) }
        bcrypt.compare(password, foundUser.password)
          .then((result) => {
            if(!result) { return done(null, false, {message: 'Incorrect username or password'}) }
            return done(null, foundUser)
          })
        return done(null, foundUser);
      })
      .catch((err) => next(err));
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  })
}



// previous code
// username, password must be called exactly this
// const verifyCallBack = async (username, password, done) => {
//   const client = await pool.connect().catch((err) =>
//     next({
//       log: `authController - pool connection failed; ERROR: ${err}`,
//       message: {
//         err: "Error in authController.createUser. Check server logs",
//       },
//     })
//   );
//   try {
//     const userQuery = `SELECT username, pw FROM users WHERE username= ? AND pw= ?`;
//     const result = await client.query(userQuery, [username, password]);
//   } catch (e) {
//   } finally {
//     client.release();
//     return next();
//   }
// };

// const strategy = new LocalStrategy();
