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
    return Promise.all(['yo!', 'hello!', 'hey buddy!'].map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      }) 
      .then(res => {
        expect(res.body).toHaveLength(3);
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
          text: 'What up!',
          handle: 'ivan',
          _id
        });
      });
  });

    
  it('can find a tweet by id and update', () => {
    return createTweet('helo!')
      .then(createdTweet => {
        const id = createdTweet._id;
        return request(app)
          .put(`/tweets/${id}`)
          .send({ 
            handle: 'ivan',
            text: 'hello!', 
            _id: expect.any(String) 
          })
          .then(res => {
            expect(res.body.text).toEqual('hello!');
          });
      });
  });

  it('can delete a tweet', () => {
    return createTweet('hello!')
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});
