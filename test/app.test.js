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
    return request(app)
      .post('/tweets')
      .send({
        handle: 'AMDennis87',
        text: 'Nooo'
      })
      .send({
        handle: 'DMAaron87',
        text: 'Yesss'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'DMAaron87',
          text: 'Yesss',
          _id: expect.any(String)
        });
      });
  });
});
