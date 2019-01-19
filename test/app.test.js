const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')

const createTweet = (handle) => {
  return request(app)
    .post('/tweets')
    .send({
      handle: handle,
      tweet: 'test tweet'
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
      .send({ handle: 'ryan', text: 'my first tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ryan',
          text: 'my first tweet',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of all the tweets', () => {
    const handlesToMake = ['connor1', 'connor2', 'connor3'];
    return Promise.all(handlesToMake.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });
});

// In the tests, how and when do I know to use the different route methods (post, send, get, then, etc)