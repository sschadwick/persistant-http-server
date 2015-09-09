'use strict';

var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res) {
  var path = req.url.split('/');

  var notes = fs.readdirSync('./data');
  var numbers = []; //parse numbered file names

  for (var num in notes) {
    if (!isNaN(parseInt(notes[num]))) {
      numbers.push(parseInt(notes[num]));
    }
  }
  var maxFile = (Math.max.apply(Math, numbers)); //find max file number so far.
  var nextFile = maxFile + 1; //this will be the next file created

  if (req.method === 'POST') {
    req.on('data', function(data) {
      res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
      fs.writeFile(__dirname + '/data/' + nextFile, data);
      res.write('POST request logged in ' + nextFile);
      console.log('Data received: data/' + data);
      return res.end();
    })
  }

  if (req.method === 'GET') {
    fs.readFile('./data/' + path[2].toString(), function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.write(data.toString());
      return res.end();
    })
  }

  if (req.method === 'PUT') {
  }

  if (req.method === 'PATCH') {
  }

  if (req.method === 'DELETE') {
    fs.unlink('./data/' + path[2].toString(), function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.write('That log has been deleted');
      return res.end();
    })
  }

});

server.listen(3000, function() {
  console.log('server is running on localhost:3000');
})
