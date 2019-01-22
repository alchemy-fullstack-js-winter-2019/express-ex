const request = require('supertest');
const app = require('../lib/app');

const mkdirp = require('mkdirp');
const rimraf = require('rimraf'); 

const createTweet = (handle) => {
  return request(app)
    .post('/tweets')
    .send({
      name: handle,
      text: 'my first tweet' })
    .then(res => res.body);
};

describe('tweets', () => {

  beforeEach(done => {
    rimraf('./data/tweets', err => {
      done(err);
    });
  });
  beforeEach((done) => {
    mkdirp('./data/tweets', err => {
      done(err);
    });
  }); 

  it('gets a tweet', () => {
    return request(app)
      .get('/tweets/')
      .then(res => {
        expect(res.text).toEqual('');
      });
  });
});

it('gets a tweet by id', () => {
  return createTweet('my first tweet')
    .then(createdTweet => {
      const _id = createdTweet._id;
      return request(app)
        .get(`/tweets/${_id}`);
    })
    .then(res => {
      expect(res.body).toEqual({
        id: _id,
        text: 'my first tweet'
      });
    });
});

it('gets a list of tweets', () => {
  const tweetsToCreate = ['hello', 'hola', 'shalom'];
  return Promise.all(tweetsToCreate.map(createTweet))
    .then(() => {
      return request(app)
        .get('/tweets');
    })
    .then(({ body }) => {
      expect(body).toEqual({ handle: 'abel1', text: 'hello', _id: expect.any(String) });
    });
});

it('gets a tweet by id and updates', () => {
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


it('gets a tweet by id and deletes', () => {
  return createTweet('this will be deleted')
    .then(newTweet => {
      const id = newTweet._id;
      return request(app)
        .delete(`/tweets/${id}`)
        .then(res => {
          expect(res.body).toEqual({ deleted: 1 });
        });
    });
});

it('can send a tweet', () => {
  return request(app)
    .post('/tweets')
    .send({ handle: 'abel', text: 'is this how i tweet' })
    .then(res => {
      expect(res.body).toEqual({ handle: 'abel', text: 'is this how i tweet', _id: expect.any(String) });
    });
});
