const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('supertest');
const app = require('../lib/app');

const createTweet = (handle) => {
  return request(app)
    .post('/tweets')
    .send({ 
      handle: handle,
      tweet: 'tweetie bird'
    })
    .then(res => res.body);
};

describe('tweets', () => {
  beforeEach((done) => {
    rimraf('./lib/data/tweets', err => {
      done(err);
    });
  });

  beforeEach((done) => {
    mkdirp('./lib/data/tweets', err => {
      done(err);
    });
  });

  it('creates a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'jei',
        tweet: 'texting 1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'jei',
          tweet: 'testing 1234',
          _id: expect.any(String)
        });
      });
  });
  it('can list all the tweets in db', () => {
    const handles = ['jei1', 'jei2', 'jei3'];
    return Promise.all(handles.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });
  it('gets a tweet by id', () => {
    return request(app)
      .get('/tweets/abc')
      .then(res => {
        expect(res.text).toEqual('abc');
      });
  });
  it('updates a tweet with :id and returns the update', () => {
    return createTweet('jei1')
      .then(createdTweet => {
        createdTweet.handle = 'test';
        return request(app)
          .put(`/tweets/${createdTweet._id}`)
          .send(createdTweet);
      })
      .then(res => {
        expect(res.text).toContain('test');
      });
  });
  it('deletes a tweet with id and delete', () => {
    return createTweet('tweet tweet')
      .then((createdTweet) => {
        const id = createdTweet._id;
        return request(app)
          .delete(`/tweets/${id}`)
          .then(res => {
            expect(res.body).toEqual({ 'deleted': 1 });
          });
      });
  });
});

