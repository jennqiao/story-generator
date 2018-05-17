var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var db = require('../db/user.js');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var session = require('express-session')
var passport = require('passport');

var app = express();

app.use(express.static(__dirname + '/../client/public'));
app.use(express.static(__dirname + '/../client/public/images'));

app.use(morgan('dev'));
app.use(parser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


app.get('*', function (request, response){
  // console.log('authentication?', request.user);
  // console.log('authentication?', request.isAuthenticated());

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

  console.log('data received', emailAddress, password);
  db.create({email: emailAddress, password: password}, (err, user) => {
    if (err) {
      res.status(500);
      res.end(err);
    } else {
      console.log('here is user', user);

      let id = user._id;
      console.log(id);
      req.login(id, (err) => {
        res.status(200);
        res.end('user registered');
      });
    }
  });
})

passport.serializeUser(function(id, done) {
  done(null, id);
});
 
passport.deserializeUser(function(id, done) {
    done(null, id);
});

app.listen(1111, function() {
  console.log('Listening on port 1111 now');
});

