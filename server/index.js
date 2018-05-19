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
var LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);


var app = express();

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

passport.use(new LocalStrategy( {
  usernameField: 'emailAddress'
  }, 
  function(username, password, done) {
    db.User.findOne({ email: username }, function (err, user) {
      console.log('err and user', err, user);
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { msg: 'Oops! That email does not exist.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { msg: 'There was an issue with the login info provided. :(' });
      }
      return done(null, user._id);
    });
  }
));

app.use((req, res, next) => {

  res.locals.isAuthenticated = req.isAuthenticated();
  console.log('here is res', res.locals.isAuthenticated)
  next();
})

app.get('/isAuthenticated', (req, res) => {
  console.log('here is res2', res.locals.isAuthenticated);

  if (res.locals.isAuthenticated) {
    db.findOne(req.user, (err, user) => {
      if (err) {
        res.status(500);
        res.end('error in server', err);
      } else {
        console.log('in the server', user);
        res.json({user: user, isLoggedIn: res.locals.isAuthenticated});
      }
    })
  } else {
    res.json({isLoggedIn: res.locals.isAuthenticated});

  }
})

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

app.get('*', function (request, response){
  // console.log('authentication?', request.user);
  console.log('authentication?', request.isAuthenticated());
  // console.log('request session', request.session.passport.user);

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
      let id = user._id;
      req.login(id, (err) => {
        res.status(200);
        res.end('user registered');
      });
    }
  });
})


app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.status(422).send({ errors: [info]}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(200).send(user);
    });
  })(req, res, next);
});

passport.serializeUser(function(id, done) {
  done(null, id);
});
 
passport.deserializeUser(function(id, done) {
    done(null, id);
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

