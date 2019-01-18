const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('tweets', () => {
  beforeEach(done => {
    rimraf('./data/tweets', err => {
      done(err);
    });
  });
  beforeEach(done => {
    mkdirp('/data/tweets', err => {
      done(err);
    });
  });
  it('gets a tweet', () => {
    return request(app)
      .get('/tweets/abcd')
      .send({ handle: 'ryan', text: 'my first tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ryan',
          text: 'my first tweet',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of tweets', () => {
    return request(app)
      .get('/tweets/abcd')
      .send([{ handle: 'ryan', text: '1 in my list of tweets' }, { handle: 'ryan', text: '2 in my list of tweets' }, { handle: 'ryan', text: '3 in my list of tweets' }])
      
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });
});


