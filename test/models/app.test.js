const request = require('supertest');
const app = require('../../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const createTweet = handle => {
  return request(app)
    .post('/tweets')
    .send({
      handle,
      text: 'my first tweet',
      _id: expect.any(String)
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

  it('creates a tweet', () => {
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
  it('gets a list of tweets from our db', () => {
    const tweetsToCreate = ['tweet A', 'tweet B', 'tweet C', 'tweet D'];
    return Promise.all(tweetsToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(4);
      });
  });
  it('gets a tweet by id', () => {
    return createTweet('mac')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .get(`/tweets/${_id}`)
          .then(res => {
            expect(res.body).toEqual({
              handle: 'mac',
              text: 'my first tweet',
              _id: _id
            });
          });
      });
  });
});
it('updates a tweet by id', () => {
  return createTweet('mac')
    .then(createdTweet => {
      const _id = createdTweet._id;
      return request(app)
        .put(`/tweets/${_id}`)
        .send({ handle: 'mac', text: 'updated' })
        .then(res => {
          expect(res.body).toEqual({
            handle: 'mac',
            text: 'updated',
            _id: _id
          });
        });
    });
});
it('deletes a tweet by id', () => {
  return createTweet('mac')
    .then(createdTweet => {
      const _id = createdTweet._id;
      return request(app)
        .delete(`/tweets/${_id}`)
        .then(res => {
          expect(res.body).toEqual({ deleted: 1 });
        });
    });
});
