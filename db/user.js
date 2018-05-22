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
  hash: {
    type: String,
    // select: false
  },
  name: String,
  profile: mongoose.Schema.Types.Mixed,
  currentPage: {
    type: String,
    default: "0"
  }
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

const createUser = ({email, password, name, profile}, cb) => {

  User.create({email: email, name: name, profile: profile}, (err, user) => {
    if (err) {
      cb(err, null);
    } else {
      console.log('here is the user', user);
      user.hash = user.setPassword(password);
      user.save().then((user) => {
        cb(null, user);
      });
      
    }
  })

}

const findOne = (userId, cb) => {

    User.findById(userId, (err, user) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, user);
      }
    })

};

const updateUser = (id, newData, callback) => {

  User.update({_id: id}, newData, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })

}

// updateUser("5b0388a2101dd027bf47d83d", {currentPage: "1a"}, (err, result) => {
//   console.log('err and result', err, result);
// }) 

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


// User.findById("5aff6f4ce3508aef6c0ff5cd", (err, user) => {
//   if (err) {
//      console.log('err', err);
//   } else {
//    console.log('user', user);
//    user["profile"] = {
//     face:
//     "images/013a80b965f231e51a264a5c9e47a653.png",
//     hair:
//     "images/a58991a27a738633ce5953f3c7297f10.png",
//     haircolor:
//     "images/399aab1e9d9595d5bdc2a78568dfc93b.png",
//     head:
//     "images/250a267fdb65fb7b4f619fcfb558ecb5.png" 
//    }
//   }
//   user.save().then((user) => {
//     console.log('saved user!', user);
//   });
// })

module.exports.create = createUser;
module.exports.findOne = findOne;
module.exports.updateUser = updateUser;
module.exports.User = User;



