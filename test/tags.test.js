const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

describe('test tag routes', () => {
  const createTag = (tag) => {
    return request(app)
      .post('/tags')
      .send({ group: 'cool thing', tag })
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

  it('can post a tag', () => {
    return request(app)
      .post('/tags')
      .send({ group: 'hello', tag: 'super cool tag' })
      .then(res => {
        expect(res.body.group).toContain('hello');
      });
  });
});