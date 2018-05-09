var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

var app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/../client/public/'));

// app.get('*', function (request, response){
//   response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'))
// })

app.listen(1111, function() {
  console.log('Listening on port 1111 now');
});