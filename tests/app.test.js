const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const createTweet = (handle) => {
  return request(app)
    .post('/tweets')
    .send({
      handle: handle,
      text: 'my first tweet'
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

  it('posts a tweet', () => {
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
  it('gets a list of tweets', () => {
    const tweetsToMake = ['tyler', 'ryan', 'frank'];
    return Promise.all(tweetsToMake.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        console.log('res.text\n\n\n\n\n', res.body);
        expect(res.body).toHaveLength(3);
      });
  });
});

