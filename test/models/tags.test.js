const app = require('../../lib/app');
const mkdirp = require('mkdirp');
const request = require('supertest');
const rimraf = require('rimraf');

const makeTag = (text) => {
  return request(app)
    .post('/tweets')
    .send({
      text: `#${text}`
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

  it('creates a new hashtag', () => {
    return request(app)
      .post('/tags')
      .send({ tag: '#threedayweekend' })
      .then(res => {
        expect(res.body).toEqual({ 
          tag: '#threedayweekend',
          _id: expect.any(String) 
        });
      });
  });

});
