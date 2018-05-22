const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

let storySchema = mongoose.Schema({
  id: {
    image: String,
    positionLeft: Number,
    positionRight: Number,
    text: String,
    children: [{
      buttonText: String,
      pageId: String
    }]
  }
});

const Story = mongoose.model('Story', storySchema);

const save = (page) => {

  // Story.findOneAndUpdate({id: page.id}, page, {upsert: true, new: true}, (err, page) => {
  //   if (err) {
  //     callback(err, null);
  //   } else {
  //     callback(null, page);
  //   }
  // })

  Story.create(page, function (err, page) {
    if (err) return handleError(err);
    // saved!
    console.log('page saved!', page);
  });
};

module.exports.save = save;
