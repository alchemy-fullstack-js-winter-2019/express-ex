const request = require('supertest');
const app = require('../lib/app');
// const mkdirp = require('mkdirp');
// const rimraf = require('rimraf');

describe('tweets', () => {
  // beforeEach(done => {
  //   rimraf('./data/tweets', err => {
  //     done(err);
  //   });
  // });
  // beforeEach(done => {
  //   mkdirp('/data/tweets', err => {
  //     done(err);
  //   });
  // });

  it('creates and reads a tweet', () => {
    return request(app)
      .post(('/tweets/abcd'), (req, res) => {
        req.send({ 
          handle: 'ryan', 
          text: 'You created and read a tweet', 
          _id: 1234
        });
        res.get('/tweets/abcd');
        res.then(res => {
          expect(res.body).toEqual({ handle: 'ryan', text: 'You created and read a tweet', _id: 1234 });
        });
      });
  });
});
