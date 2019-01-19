const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('supertest');
const app = require('../lib/app');

const createTweet = (handle, text) => {
  return request(app)
    .post('/tweets')
    .send({
      handle,
      text
    })
    .then(res => res.body);
};

describe('app tests', () => {
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

  describe('tweets', () => {
    it('creates a new tweet', () => {
      return request(app)
        .post('/tweets')
        .send({ handle: 'tweety', text: 'my first tweet' })
        .then(res => {
          expect(res.body).toEqual({
            handle: 'tweety',
            text: 'my first tweet',
            _id: expect.any(String)
          });
        });
    });
    it('gets a list of tweet by id', () => {
      return createTweet('tweet1', 'I am a tweet')
        .then(createdTweet => {
          const id = createdTweet._id;
          return request(app)
            .get(`/tweets/${id}`);
        })
        .then(res => {
          expect(res.body).toEqual({ handle:'tweet1', text: 'I am a tweet', _id: expect.any(String) });
        });
    });
    it('gets a list of tweets from db', () => {
      const tweetsToCreate = ['tweet1', 'tweet2', 'tweet3'];
      return Promise.all(tweetsToCreate.map(createTweet))
        .then(() => {
          return request(app)
            .get('/tweets');
        })
        .then(({ body }) => {
          expect(body).toHaveLength(3);
        });
    });
    it('gets a tweet by id and update', () => {
      return createTweet('tweet tweet')
        .then(createdTweet => {
          const id = createdTweet._id;
          return request(app)
            .put(`/tweets/${id}`)
            .send({
              handle: 'tweet 5',
              text: 'tweet back',
              _id: id
            })
            .then(() => {
              return request(app)
                .get(`/tweets/${id}`)
                .then(res => {
                  expect(res.body).toEqual({
                    handle: 'tweet 5',
                    text: 'tweet back',
                    _id: id
                  });
                });
            });
        });
    });
    it('delete tweet by id', () => {
      return createTweet('tweeet')
        .then(createdTweet => {
          const id = createdTweet._id;
          return request(app)
            .delete(`/tweets/${id}`)
            .then(res =>  {
              expect(res.body).toEqual({
                deleted: 1
              });
            });
        });
    });
  });
});

describe('app tests', () => {
  beforeEach(done => {
    rimraf('./data/tags', err => {
      done(err);
    });
  });
  beforeEach(done => {
    mkdirp('./data/tags', err => {
      done(err);
    });
  });
  it('creates a new tag', () => {
    return request(app)
      .post('/tags')
      .send({ name: '#1' })
      .then(res => {
        expect(res.body).toEqual({
          name: '#1',
          _id: expect.any(String)
        });
      });
  });
});
