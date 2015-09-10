'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');
var server = require('../server');
var fs = require('fs');

chai.use(chaihttp);

var data = []; //original directory of files
var newData = []; //dir of files after request
fs.readdir('./data', function(err, files) {
  data = files;
});

describe('POST route', function() {
  it('should create a new file', function(done) {
    chai.request('localhost:3000')
    .post('/notes')
    .send({msg: 'Another message?!?'})
    .end(function(err, res) {
      fs.readdir('./data', function(err, files) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(files.length).to.be.greaterThan(data.length);
      });
      done();
    });
  });
});

var numbers = [0];
for (var file in data) {
  if (!isNaN(parseInt(data[file]))) {
    numbers.push(parseInt(data[file]));
  }
}
var maxFile = (Math.max.apply(Math, numbers)); //find max file number so far.

describe('GET route', function() {
  it('should read the stored request', function(done) {
    chai.request('localhost:3000')
    .get('/notes/' + maxFile)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text).hasOwnProperty('msg')).to.eql(true);
      expect(JSON.parse(res.text).msg).to.eql('Another message?!?');
    });
    done();
  });
});

describe('DELETE route', function() {
  it('should delete the newly created file', function(done) {
    chai.request('localhost:3000')
    .delete('/notes/' + maxFile)
    .end(function(err, res) {
      fs.readdir('./data', function(err, files) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(files.length).to.eql(data.length);
      });
      done();
    });
  });
});
