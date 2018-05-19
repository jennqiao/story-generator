var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var db = require('../db/user.js');
var connection = require('../db/index.js');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var session = require('express-session')
var passport = require('passport');
const MongoStore = require('connect-mongo')(session);


var app = express();
module.exports.app = app;

app.use(express.static(__dirname + '/../client/public'));
app.use(express.static(__dirname + '/../client/public/images'));

app.use(morgan('dev'));
app.use(parser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: connection })
}));

app.use(passport.initialize());
app.use(passport.session());
require('./passport.js')(passport);


app.use((req, res, next) => {
  console.log('in the middleware');
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
})


app.get('/isAuthenticated', (req, res) => {
  console.log('in the is authenticated? get request')
  res.json({isLoggedIn: res.locals.isAuthenticated, user: req.user});
})

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})


app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'))
})

app.post('/register', [
  check('emailAddress', 'Oops! This is not a valid email.').isEmail(), 
  check('password', 'Password must be at least 5 characters long').isLength({min: 5})
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  let emailAddress = req.body.emailAddress;
  let password = req.body.password;
  let name = req.body.name;

  console.log('data received', emailAddress, password, name);
  db.create({email: emailAddress, password: password, name: name}, (err, user) => {
    if (err) {
      err.errors = [ {msg: "Oops! That email already exists."}]
      res.status(500);
      res.json(err);
    } else {
      console.log('here is user', user);
      req.login(user, (err) => {
        res.status(200);
        res.json({user:user, isLoggedIn: true});
      });
    }
  });
})


app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log('in the login post request');
    if (err) { return next(err); }
    if (!user) { return res.status(422).send({ errors: [info]}); }
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.status(200).json({user: user, isLoggedIn: true});
    });
  })(req, res, next);
});


// app.get('/profile', authenticationMiddleware(), (req, res) => {

//   res.status(200).end('got profile!');
// })


function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login');
	}
}



app.listen(1111, function() {
  console.log('Listening on port 1111 now');
});

