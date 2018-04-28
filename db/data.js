const fs = require('fs');

// create array of objs
// read file
// split by line to get objs
// for each obj
// split by comma
// create obj
// assign title,id,price,keywords,description,num_reviews,avg_rating,imageUrl to value in array
// push obj to array of objs

let pages = [];

fs.readFile('./exampledata.tsv', 'utf8', (err, data) => {
  if (err) {
    console.log('error in reading'.err);
  } else {
    const objs = data.split('\r\n');
    for (let i = 0; i < objs.length; i++) {
      const page = objs[i].split('\t');

      const newObj = {
        image: page[0],
        text: page[1],
        children: []
      }

      for (let i=2; i<page.length; i+=2) {
        if (page[i].length > 0) {
          let childrenPage = {
            buttonText: page[i],
            pageId: page[i+1]
          }
          console.log('here is the children', childrenPage);
          newObj.children.push(childrenPage);
        }
                
      }
      pages.push(newObj);

    }
    console.log(pages);

    // for (let i = 0; i < listings.length; i++) {
    //   db.save(listings[i], (err, listing) => {
    //     if (err) {
    //       console.log('error', err);
    //     } else {
    //       console.log('success', listing);
    //     }
    //   });
    // }
  }
});

