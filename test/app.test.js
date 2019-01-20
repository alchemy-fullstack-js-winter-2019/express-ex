const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const createTweet = text => {
  return request(app)
    .post('/tweets')
    .send({
      handle: 'johnny',
      text: text
    })
    .then(res => res.body);
};
describe('tweets', () => {
  beforeEach((done) => {
    rimraf('./data/tweets', (err) => {
      done(err);
    });
  });
  beforeEach((done) => {
    mkdirp('./data/tweets', (err) => {
      done(err);
    });
  });
  it('creates a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'johnny', text: 'hi' })
      
      .then((res)=> {
        expect(res.body).toEqual({
          handle: 'johnny', 
          _id: expect.any(String),
          text: 'hi'
        });
      });
  });
  it.only('gets tweet by id', () => {
    return createTweet('huh')
      .then(newTweet => {
        const id = newTweet._id;
        return request(app)
          .get(`/tweets/${id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'johnny',
          text: 'huh',
          _id: expect.any(String)
        });
      });
  });

});


