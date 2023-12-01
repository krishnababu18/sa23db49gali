var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function (user){
        if (err) { return done(err); }
        if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
      })
      .catch(function(err){
        return done(err)
    })
  })
)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var icecreamRouter = require('./routes/icecream');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var icecream = require("./models/icecream");
var resourceRouter = require('./routes/resource');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/icecream', icecreamRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
// Fix the model export

require('dotenv').config();
const connectionString = process.env.MONGO_CON

mongoose = require('mongoose');
var Earbud = require('./models/icecream');
mongoose.connect(connectionString);
// Get the default connection
var db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Connection open event
db.once('open', function () {
  console.log('Connection to DB succeeded');
});

async function recreateDB() {
  await icecream.deleteMany();
  let instance1 = new icecream({
    "icecream_flavour": "Chocolate",
    "icecream_quantity": "3 liters",
    "icecream_cost": 60
  });
  await instance1.save();
  console.log("First object saved");

  let instance2 = new icecream({
    "icecream_flavour": "Butter Scotch",
    "icecream_quantity": "2 liters",
    "icecream_cost": 70
  });
  await instance2.save();
  console.log("Second object saved");

  let instance3 = new icecream({
    "icecream_flavour": "Strawberry",
    "icecream_quantity": "3 liters",
    "icecream_cost": 90
  });
  await instance3.save();
  console.log("Third object saved");
}

let reseed = true;
if (reseed) {
  recreateDB();
}


// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

module.exports = app;
