const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');


const PORT = 3000;
const app = express();

app.use(morgan('tiny'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// session configuration
app.use(
  session({
    // env variable for secret
    secret: 'hello',
    resave: false,
    saveUninitialized: true,
  }),
);

// initilize use of passport and sessions
app.use(passport.initialize());
app.use(passport.session());

// require and execute passport config
require('../server/config/passport-config.js')(passport);

const authRouter = require("./routes/authRouter");
const listingRouter = require('./routes/listingRouter');
const imageRouter = require('./routes/imageRouter');
const cartRouter = require('./routes/cartRouter');
const auctionRouter = require('./routes/auctionRouter');
const userRouter = require('./routes/userRouter');


app.use('/', express.static(path.join(__dirname, '../dist')));

app.use("/auction", auctionRouter)
app.use("/user", userRouter)
app.use("/listing", listingRouter);
app.use("/image", imageRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);


app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught ${err.origin} middleware error`,
    status: 500,
    message: { err: "An error occurred" },
  };
  console.log(err)
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
