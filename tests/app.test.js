const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');


const testData =  handle => {
  return request(app)
    .post('/tweets')
    .send({
      handle,
      text:'you have no idea'
    })
    .then(res => res.body);
};


describe('express server', () => {
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
      .send({ handle: 'mike', text:'my 1st tweet' })
      .then(res => {
        // console.log('banana', res);
        expect(res.body).toEqual({
          handle:'mike',
          text:'my 1st tweet',
          _id: expect.any(String)
        });
      });
  });
  it('gets all the tweets', () => {
    const tweetsToTest = ['tweet1', 'tweet2', 'tweet3'];
    return Promise.all(tweetsToTest.map(testData))
      .then(() => {
        return request(app)
          .get('/tweets');
      })  
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });


});
