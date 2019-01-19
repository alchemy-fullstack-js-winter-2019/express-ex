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

  // it('gets a list of tweets', () => { //
  //   return request(app)            //ryan's example
  //     .post('/tweets')
  //     .send({ handle: 'ryan', text: 'tweet1' })
  //     .then(() => {
  //       return request(app)
  //         .post('/tweets')
  //         .send({ handle: 'ryan', text: 'tweet2' });
  //     })
  //     .then(() => {
  //       return request(app)
  //         .get('/tweets');
  //     })
  //     .then(({ body }) => {
  //       expect(body).toHaveLength(2);
  //     });
  // });

  // .get('/tweets')  //my first attempt
  // .send([{ handle: 'ryan', text: '1 in my list of tweets' }, { handle: 'ryan', text: '2 in my list of tweets' }, { handle: 'ryan', text: '3 in my list of tweets' }]) 
  // .then(res => {
  //   expect(res.body).toHaveLength(3);
  // });
  //});

  it('gets a tweet', () => {
    return Promise.all(['hi', 'bye'].map(createTweet));

  //   return request(app)
  //     .get('/tweets/:id') // was: /tweets/abcd
  //     .send({ text: 'abcd' })//({ handle: 'ryan', text: 'my first tweet' })
  //     .then(res => {
  //       expect(res.text).toEqual({
  //         handle: 'ryan',
  //         text: 'my first tweet',
  //         _id: expect.any(String)
  //       });
  //     });
  });
});

//post - create
//get id - findById
//get list - find
//put - findByIdAndUpdate
//delete - findByIdAndDelete

