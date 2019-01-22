const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

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
        handle: 'ghostrider',
        tweet: 'longboarding life yo'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ghostrider',
          tweet: 'longboarding life yo',
          _id: expect.any(String)
        });
      });
  });
  it('can list all the tweets in the database', () => {
    const handles = ['roxy1', 'roxy2', 'roxy3', 'roxy4'];
    return Promise.all(handles.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(4);
      });
  });
  it('gets a tweet by id', () => {
    return createTweet('kristin1')
      .then(createdTweet => {
        return request(app) 
          .get(`/tweets/${createdTweet._id}`)
          .then(res => {
            expect(res.body).toEqual({
              handle: 'kristin1',
              tweet: 'test tweet',
              _id: expect.any(String)
            });
          });
      });
  });
  it('updates a tweet with :id and returns the update', () => {
    return createTweet('kristin1')
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
  it('deletes a tweet with :id and returns the delete count', () => {
    return createTweet('baller for lyfe')
      .then((createdTweet) => {
        const id = createdTweet._id;
        return request(app)
          .delete(`/tweets/${id}`)
          .then(res => {
            expect(res.body).toEqual({ 'deleted': 1 });
          });
      });
  });
  it('errors when there is no tag with an id', () => {
    return request(app)
      .get('/tweets/badId')
      .then(res => {
        expect(res.status).toEqual(500);
        expect(res.body).toEqual({ error: expect.any(String) });
      });
  });
});
