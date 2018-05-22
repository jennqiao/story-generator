const fs = require('fs');

let pages = {};

fs.readFile('./exampledata.tsv', 'utf8', (err, data) => {
  if (err) {
    console.log('error in reading'.err);
  } else {
    const objs = data.split('\r\n');
    for (let i = 0; i < objs.length; i++) {
      const page = objs[i].split('\t');
      // console.log('here is page', page);
      const newObj = {
        image: page[1],
        leftPosition: Number(page[2]),
        topPosition: Number(page[3]),
        text: page[4],
        children: []
      }

      for (let i=5; i<page.length; i+=2) {
        if (page[i].length > 0) {
          let childrenPage = {
            buttonText: page[i],
            pageId: page[i+1]
          }
          newObj.children.push(childrenPage);
        }
                
      }
      pages[page[0]] = newObj;
    }
    console.log('here are the pages', pages);

    // for (let i = 0; i < listings.length; i++) {
    //   db.save(listings[i], (err, listing) => {
    //     if (err) {
    //       console.log('error', err);
    //     } else {
    //       console.log('success', listing);
    //     }
    //   });
    // }

    try {
      fs.writeFileSync('./exampleStory.json', JSON.stringify(pages ,null, 2));
    } catch (err) {
      /* Handle the error */
      console.log('err', err);
    }

  }
});


module.exports = pages;
