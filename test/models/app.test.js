const app = require('../../lib/app');
const mkdirp = require('mkdirp');
const request = require('supertest');
const rimraf = require('rimraf');


const makeTweet = (text) => {
  return request(app)
    .post('/tweets')
    .send({
      handle: 'katerj',
      tweet: text
    })
    .then(res => res.body);
};

describe('tweets', () => {

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
      .send({ 
        handle: 'katerj', 
        text: 'my first tweet' 
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'katerj',
          text: 'my first tweet',
          _id: expect.any(String)
        });
      });
  });

  it('gets a tweet by id', () => {
    return request(app)
      .post('/tweets')
      .send({ 
        handle: 'katerj', 
        text: 'my first tweet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'katerj',
          text: 'my first tweet',
          _id: expect.any(String)
        });
      });
  });

});
