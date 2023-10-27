const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
        // return done(null, foundUser);
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

passport.use(new GoogleStrategy({
    clientID: '962220687338-1vogif80pldh0d8d50ci2j7s60h2hegn.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true,
  },
  async function (request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    const foundUser = await User.findOne({where : {email: profile.emails[0]['value']}})
    // check database for profile's email
    if(!foundUser) {
    // create user in database here
     const createdUser = await User.create({
        address: '789 Oak St',
        city: 'Capital City',
        state: 'IL',
        zip: 62706,
        first_name: 'Emily',
        last_name: 'Smith',
        email: profile.emails[0]['value'],
        phone: 1122334455,
        password: 'password789',
      })
      return done(null, createdUser)
    }


    return done(null, foundUser);
  }))

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
