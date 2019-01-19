const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const createTweets = (handle) => {
  return request(app)
    .post('/tweets')
    .send({
      handle: handle,
      text: 'Hello'
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

  it('gets a tweet', () => {
    return request(app)
      .get('/tweets/abcd')
      .then(res => {
        expect(res.text).toEqual('abcd');
      });
  });

  it('can post a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'Aaron',
        text: 'Hey there',
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Aaron',
          text: 'Hey there',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of all tweets', () => {
    return Promise.all(['Aaron1', 'Aaron2', 'Aaron3', 'Aaron4', 'Aaron5'].map(handle => {
      return createTweets(handle);
    }))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(5);
      });
  });

  it('it finds by id and updates object', () => {
    return createTweets('Peter')
      .then(createdTweets => {
        createdTweets.handle = 'Peter2';
        return request(app)
          .put(`/tweets/${createdTweets._id}`)
          .send(createdTweets);
      })
      .then(res => {
        expect(res.text).toContain('Peter2');
      });
  });

  it('finds by id and deletes object', () => {
    return createTweets('Peter')
      .then(createdTweets => {
        const id = createdTweets._id;
        return request(app)
          .del(`/tweets/${id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 'deleted': 1 });
      });
  });
});
