const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('supertest');
const app = require('../lib/app');

describe('tweets', () => {
  const createTweet = (text, handle = 'sophie') => {
    return request (app)
      .post('/tweets')
      .send({ handle, text })
      .then(res => res.body);
  };

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
      .send({ handle: 'sophie', text: 'my first tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'sophie',
          text: 'my first tweet',
          _id: expect.any(String)
        });
      });
  }),

  it('gets a list of tweets', () => {
    return Promise.all(['hi', 'tweet tweet'].map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(2);
      });
  });

  
});
