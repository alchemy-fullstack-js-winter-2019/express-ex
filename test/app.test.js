const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const createTweet = (handle) => {
  return request(app)
    .post('/tweets')
    .send({
      handle,
      text: 'oink tweet moo'
    });
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
      .send({ handle: 'paige', text: 'TWEET' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'paige',
          text: 'TWEET',
          _id: expect.any(String)
        });
      });
  });

  it('gets all the tweets', () => {
    const tweetsToCreate = ['yoyo', 'jelly123', 'jessie456'];
    return Promise.all(tweetsToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets')
          .then(({ body }) => {
            expect(body).toHaveLength(3);
          });
      });
  });

  it('gets a tweet by id', () => {
    return createTweet('boohbah')
      .then(({ body }) => {
        return request(app)
          .get(`/tweets/${body._id}`);
      })
      .then(({ body }) => {
        console.log(body._id);
        expect(body).toEqual({
          handle: 'boohbah',
          text: 'oink tweet moo',
          _id: expect.any(String)
        });
      });
  });

});
