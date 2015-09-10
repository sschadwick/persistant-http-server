'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');
var server = require('../server');
var fs = require('fs');

chai.use(chaihttp);

describe('GET route', function() {
  it('should read a stored request', function(done) {
    chai.request('localhost:3000')
    .get('/notes/1')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(JSON.parse(res.text).hasOwnProperty('msg')).to.eql(true);
      expect(JSON.parse(res.text).msg).to.eql('Another message?!?')
    })
    done();
  })
})

var data = [];
var newData = [];
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
    })
  })
})

// describe('DELETE route', function() {
//   it('should delete the newly created file', function(done) {
//     chai.request('localhost:3000')
//     .delete('/notes/8')// need to make it delete new file
//     .end(function(err, res) {
//       newData = fs.readdirSync('./data');
//       expect(err).to.eql(null);
//       expect(res).to.have.status(200);
//       expect(newData.length).to.be.lessThan(data.length);
//       done();
//     })
//   })
// })
