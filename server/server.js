require('dotenv').config()

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



const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

const client = createClient({
  password: 'PIvyCh6v09PexC8KI06UoHsC2emwsEW0',
  socket: {
      host: 'redis-14153.c60.us-west-1-2.ec2.cloud.redislabs.com',
      port: 14153
  }
})

client.connect()

const store = new RedisStore({ client: client, prefix: "myapp:", ttl: 60});


app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: store
}));


// session configuration
// app.use(
//   session({
//     // env variable for secret
//     secret: 'hello',
//     resave: false,
//     saveUninitialized: true,
//   }),
// );

// initilize use of passport and sessions
app.use(passport.initialize());
app.use(passport.session());

// require and execute passport config
require('../server/config/passport-config.js')(passport);

const authRouter = require("./routes/authRouter");
const listingRouter = require('./routes/listingRouter');
//const imageRouter = require('./routes/imageRouter');
const cartRouter = require('./routes/cartRouter');
const auctionRouter = require('./routes/auctionRouter');
const userRouter = require('./routes/userRouter');
const protectedRoute = require('./middleware/protectedRoute')

app.use('/', express.static(path.join(__dirname, '../dist')));

app.use("/auction", auctionRouter)
app.use("/user", protectedRoute, userRouter)
app.use("/listing", listingRouter);
//app.use("/image", imageRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);

app.get("*", (req, res) => {
  console.log("no build");
  res
    .status(200)
    .sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

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
