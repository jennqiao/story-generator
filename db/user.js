const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;
var jwt = require('jsonwebtoken');

let bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  name: String
});


userSchema.methods.setPassword = function(password){
  return bcrypt.hashSync(password, saltRounds);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.hash);
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

const User = mongoose.model('User', userSchema);

const createUser = ({email, password, name}, cb) => {

  User.create({email: email, name: name}, (err, user) => {
    if (err) {
      cb(err, null);
    } else {
      console.log('here is the user', user);
      user.hash = user.setPassword(password);
      user.save();
      cb(null, user);
    }
  })

}

const findOne = (userId, cb) => {

    User.findById(userId, (err, user) => {
      if (err) {
        cb(err, null);
      } else {
        let name = user.name;
        cb(null, {name});
      }
    })
};

// User.create({email: "test@gmail.com"}, (err, user) => {
//   if (err) {
//     console.log('db create error', err)
//   } else {
//     console.log('here is the user', user);
//   }
// });

// User.findOne({ email: 'test@gmail.com' }, function (err, user) {
//   if (err) { return done(err); }
//   // Return if user not found in database
//   if (!user) {
//     return done(null, false, {
//       message: 'User not found'
//     });
//   }

//   if (user) {
//     user.hash = user.setPassword('password');
//     user.save();
//   }


// })


// User.findOne({ email: 'test@gmail.com' }, function (err, user) {
//   if (err) { return done(err); }
//   // Return if user not found in database
//   if (!user) {
//     return done(null, false, {
//       message: 'User not found'
//     });
//   }
//   // console.log('here is user', user);
//   if (!user.validPassword('password')) {
//    console.log('this is wrong')
//   } else {

//     console.log('this is the right pass')
//   }
//   // If credentials are correct, return the user object
// })


// console.log(findOne('5aff597a109152e79c5e2308', (err, user) => {
//   console.log(err, user);
// }));

module.exports.create = createUser;
module.exports.findOne = findOne;
module.exports.User = User;


