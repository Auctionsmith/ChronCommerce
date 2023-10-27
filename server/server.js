require('dotenv').config()

const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

const PORT = 3000;
const app = express();

app.use(morgan('tiny'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


// const RedisStore = require('connect-redis').default;
// const { createClient } = require('redis');

const connectRedis = require('connect-redis');
// const RedisStore = connectRedis(session)
const RedisStore = require('connect-redis').default;
const redis = require('redis')


const redisClient = redis.createClient({
  password: 'PIvyCh6v09PexC8KI06UoHsC2emwsEW0',
  socket: {
      host: 'redis-14153.c60.us-west-1-2.ec2.cloud.redislabs.com',
      port: 14153
  }
})

redisClient.on('error', (err) => {
  console.log('Could not establish a connection with redis' + err)
})
redisClient.on('connect', (err) => {
  console.log('Connected to redis successful')
})

redisClient.connect()

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // if true only transmit cookie over https
    httpOnly: false, // if true prevent client side JS from reading the cookie 
    maxAge: 1000 * 60 * 10 // session max age in miliseconds
}
}))




// below code block was first attempt at implementing redis
// redisClient.connect()

// const store = new RedisStore({ client: redisClient, prefix: "myapp:", ttl: 60});


// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     store: store
// }));



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
const paymentRouter = require('./routes/paymentRouter');

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use("/auction", auctionRouter)
app.use("/user", userRouter)
app.use("/listing", listingRouter);
//app.use("/image", imageRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use("/payments", paymentRouter);

app.get("*", (req, res) => {
  console.log(req.path)
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
