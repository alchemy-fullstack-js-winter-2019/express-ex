const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const createTweet = handle => {
  return request(app)
    .post('/tweets')
    .send({
      handle,
      text: 'tweet this'
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
});
