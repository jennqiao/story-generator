var LocalStrategy = require('passport-local').Strategy;
var db = require('../db/user.js');

module.exports = (passport) => {

  passport.use(new LocalStrategy( {
    usernameField: 'emailAddress'
    }, 
    function(username, password, done) {
      console.log('in the local strategy', username, password);
      db.User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { msg: 'Oops! That email does not exist.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { msg: 'There was an issue with the login info provided. :(' });
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
   
  passport.deserializeUser(function(id, done) {
      db.findOne(id, (err, user) => {
        if (err) {
          done(err);
        } else {
          done(null, user);
        }
      })
  });



}