const mongoose = require('mongoose');

const url = 'mongodb://jenn:mlab@ds161539.mlab.com:61539/aliyah';
mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('we are connected!');
});

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

// Listing.findOne({ id: 10000 }, 'price keywords id').exec();

// getSimilarListings(10000, (listing) => console.log('here is listing', listing));
// let testData = { keywords: [ 'animated', 'happy', 'home' ],
// id: 9999,
// imageUrl: 'https://s3.us-east-2.amazonaws.com/fantasybnb/images/1.jpg',
// description: 'ENTIRE HOUSE 1 BED',
// title: '124 Conch Street',
// price: 45,
// num_reviews: 96,
// avg_rating: 4.78};

// save(testData);
// Listing.findOne({ id: testData.id }, (err, results) => {
//   console.log(err, results);
// })

// Listing.deleteOne({ id: 9999}, (err, results) => {
//   console.log(err, results);
// });



// Listing.find((err, listings) => {
//   if (err) {
//     console.log('err', err);
//   } else {
//     console.log('here are the listings', listings);
//   }
// });


// module.exports.save = save;
// module.exports.getSimilarListings = getSimilarListings;
// module.exports.Listing = Listing;

// let testData1 = { keywords: [ 'abcde'],
// id: 9999,
// imageUrl: 'https://s3.us-east-2.amazonaws.com/fantasybnb/images/1.jpg',
// description: 'ENTIRE HOUSE 1 BED',
// title: '124 Conch Street',
// price: 45,
// num_reviews: 96,
// avg_rating: 4.78};

// let testData2 = { keywords: [ 'real' ],
// id: 8888,
// imageUrl: 'https://s3.us-east-2.amazonaws.com/fantasybnb/images/2.jpg',
// description: 'ENTIRE APARTMENT 1 BED',
// title: '221b Baker Street',
// price: 199,
// num_reviews: 47,
// avg_rating: 3.29}

// let testData3 = { keywords: [ 'home', 'abcde' ],
// id: 7777,
// imageUrl: 'https://s3.us-east-2.amazonaws.com/fantasybnb/images/4.jpg',
// description: 'ENTIRE HOUSE 3 BEDS',
// title: '742 Evergreen Terrace',
// price: 125,
// num_reviews: 28,
// avg_rating: 2.35}

// save(testData1, (err, listing) => {
//   console.log(err, listing);
// });
// save(testData2);
// save(testData3);

// getSimilarListings(9999, (listings) => {console.log('here are the listings', listings)});

// Listing.deleteOne({ id: 9999}, (err, results) => {
//   console.log(err, results);
// });

// Listing.deleteOne({ id: 7777}, (err, results) => {
//   console.log(err, results);
// });
// Listing.deleteOne({ id: 8888}, (err, results) => {
//   console.log(err, results);
// });