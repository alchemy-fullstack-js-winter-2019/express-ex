const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('express server', () => {
  beforeEach(done => {
    rimraf('./data/tweets', err => {
      done(err);
    });
  });
  beforeEach(done => {
    mkdirp('./data/tweets', err => {
      done(err);
    });
  });
  
  it('creates a new tweet', () => {  
    return request(app)
      .post('/tweets')
      .send({ handle: 'mike', text:'my 1st tweet' })
      .then(res => {
        // console.log('banana', res);
        expect(res.body).toEqual({
          handle:'mike',
          text:'my 1st tweet',
          _id: expect.any(String)
        });
      });
  });
  it('gets all the tweets', )


});
