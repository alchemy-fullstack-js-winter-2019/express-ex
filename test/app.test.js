const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('tweets', () => {
  const makeTweet = (text, handle = 'ryan') => {
    return request(app)
      .post('/tweets')
      .send({ handle, text })
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

  it('gets a tweet by id', () => {
    return makeTweet('You got it by ID')
      .then(tweet => {
        return Promise.all([
          Promise.resolve(tweet._id),
          request(app).get(`/tweets/${tweet._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          handle: 'ryan',
          text: 'You got it by ID',
          _id
        });
      });
  });

  it('creates and reads a tweet', () => {
    return request(app)
      .post(('/tweets/abcd'), (req, res) => {
        req.send({ 
          handle: 'ryan', 
          text: 'You created and read a tweet', 
          _id: 1234
        });
        res.get('/tweets/abcd');
        res.then(res => {
          expect(res.body).toEqual({ handle: 'ryan', text: 'You created and read a tweet', _id: 1234 });
        });
      });
  });
  it('gets all tweets', () => {
    const testList = ['tweet1', 'tweet2', 'tweet3'];
    return Promise.all(testList.map(makeTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      }) 
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });
});



