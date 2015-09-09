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
  var nextFile = (Math.max.apply(Math, numbers) + 1)
  //find max file name so far, create the next one.

  if (req.method === 'POST') {
    req.on('data', function(data) {
      res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
      fs.writeFile(__dirname + '/data/' + nextFile , data);
      res.write('POST request logged in ' + nextFile);
      console.log('Data received: data/' + data);
      return res.end();
    })
  }

  if (req.method === 'GET') {
    req.on('data', function(){

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })

      fs.read
      //get request should go to server/notes/1

    })
    //look up the route name, see if it is a folder within logs
    //if folder exists, then load and return the saved request
  }

  if (req.method === 'PUT') {

  }




});


server.listen(3000, function() {
  console.log('server is running on localhost:3000');
})
