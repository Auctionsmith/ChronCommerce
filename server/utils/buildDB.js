const { User, Auction, followedAuctions } = require('../db/models.js');

const getUser = async (username) => {
    User.findOne({where: {email: username}})
      .then((foundUser) => {
        if(!foundUser) { return console.log('no found user') }

        // bcrypt.compare(password, foundUser.password)
        //   .then((result) => {
        //     if(!result) { return done(null, false, {message: 'Incorrect username or password'}) }
        //     return done(null, foundUser)
        //   })
        console.log(foundUser.username)
        return console.log('found user');
})
};

// getUser('john.doe@example.com')