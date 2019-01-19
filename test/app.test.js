const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('supertest');
const app = require('../lib/app');

const createTweet = (text) => {
  return request(app)
    .post('/tweets')
    .send({
      handle: 'jei',
      text: text
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
    .send({ handle: 'jei', text: 'my first tweet'})     
    .then(res => {
      expect(res.body).toEqual({
        handle: 'jei',
        text: 'my first tweet',
        _id: expect.any(String)
      });
    });
  });

  it('gets a list of tweets from db', () => {
    return Promise.all(['tweet', 'tweet1', 'tweet2'].map(tweet => {
      createTweet(tweet);
    }))
      .then(() => {
        return request (app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3),
      });
  });

  it('gets a tweet by id and updates', () => {
    return createTweet('tweet with a typo')
      .then(tweetCreated => {
        const id = tweetCreated._id;
        return request(app)
          .put(`/tweets/${id}`)
          .send({
            handle: 'jj',
            text: 'update this tweet',
            _id: id
          })
          .then(() => {
            return request(app)
              .get(`/tweets/${id}`)
              .then(res => {
                expect(res.body.text).toEqual('update this tweet');
              });
          });
      });
  });

  it('gets a tweet by id and deletes', () => {
    return createTweet('tweet to delete')
      .then(tweetCreated => {
        const id = tweetCreated._id;
        return request(app)
          .delete(`/tweets/${id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });
      
});
