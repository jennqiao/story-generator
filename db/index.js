const mongoose = require('mongoose');

const url = 'mongodb://jenn:mlab@ds161539.mlab.com:61539/aliyah';
mongoose.connect(url);

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('we are connected!');
});

module.exports = db;

let storySchema = mongoose.Schema({
  id: String,
  image: String,
  text: String,
  children: [{
    buttonText: String,
    pageId: String
  }]
});

const Story = mongoose.model('Story', storySchema);

// const save = (page, callback) => {

//   Listing.findOneAndUpdate({id: listingObj.id}, listingObj, {upsert: true, new: true}, (err, listing) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, listing);
//     }
//   })
// };


// const getSimilarListings = (id, callback) => {

//   Listing.findOne({ id: id }, 'price keywords id').exec()
//   .then((listing) => {
//     let price = listing.price;
//     let keywords = listing.keywords;
//     let currentId = listing.id;

//     return Listing.find({ price: {$gt: price-100, $lt: price+100 }, keywords: {$in: keywords}})
//       .where({ id: {$ne: currentId}})
//       .sort({avg_rating: -1})
//       .limit(12);
//   }).then((listings) => {
//     if (listings.length < 1) {
//       return Listing.find({keywords: {$in: keywords}})
//         .where({ id: {$ne: currentId}})
//         .sort({avg_rating: -1});
//      } else {
//       return listings;
//      } 
//   }).then((listings) => {
//     callback(null, listings);
//   }).catch((err) => callback(err, null));

    


// }



// module.exports.save = save;
// module.exports.getSimilarListings = getSimilarListings;
// module.exports.Listing = Listing;

