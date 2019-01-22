const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

describe('tweets', () => {

  const createTweet = (text, handle = 'ivan') => {
    return request(app)
      .post('/tweets')
      .send({
        handle,
        text
      })
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
      .send({ handle: 'ivan', text: 'What up!' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ivan',
          text: 'What up!',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of tweets', () => {
    const tweetsToCreate = ['yo!', 'Ayyyy', 'Hello', 'Banana!'];
    return Promise.all(tweetsToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      }) 
      .then(({ body }) => {
        expect(body).toHaveLength(4);
      });
  });

  it('can get a tweet by id', () => {
    return createTweet('What up!')
      .then(createdTweet => {
        return Promise.all([
          Promise.resolve(createdTweet._id),
          request(app)
            .get(`/tweets/${createdTweet._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          handle: 'ivan',
          text: 'What up!',
          _id
        });
      });
  });

  it('errors when there is not tweet with an id', () => {
    return request(app)
      .get('/tweets/badId')
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ error: 'Bad Id: badId' });
      });
  });
    
  it('can update a tweet', () => {
    return createTweet('a tweet')
      .then(tweet => {
        const id = tweet._id;
        return request(app)
          .put(`/tweets/${id}`)
          .send({ ...tweet, text: 'a tweet' });
      })
      .then(res => {
        expect(res.body.text).toEqual('a tweet');
      });
  });

  it('can delete a tweet', () => {
    return createTweet('a tweet')
      .then(tweet => {
        return request(app)
          .delete(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});

