const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('supertest');
const app = require('../lib/app');

const createTweet = (handle, text) => {
  return request(app)
    .post('/tweets')
    .send({
      handle,
      text
    })
    .then(res => res.body);
};

describe('tweets test', () => {
  beforeEach(done => {
    rimraf('./data/tweets', err => { //remove the people directory
      done(err); 

    });
  });
  beforeEach(done => {
    mkdirp('./data/tweets', err => { //makes the directory with data and people
      done(err); 
      //mkdirp('./data/people, done)done is function that takes error
    });
  });
  it('creates a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ 
        handle: 'ryan', 
        text: 'I am a tweet' 
      })
      .then(res => {
        // console.log('response', res);
        expect(res.body).toEqual({
          handle: 'ryan',
          text: 'I am a tweet',
          _id: expect.any(String)
        });//res.body or res.text

      });
  });
  it('gets a tweet by id', () => {
    return createTweet('tweet 1', 'I am a tweet')
      .then((createdTweet) => {
        const id = createdTweet._id;
        return request(app)
          .get(`/tweets/${id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'tweet 1',
          text: 'I am a tweet',
          _id: expect.any(String)
        });
      });
  });
  it('gets a list of tweets', () => {
    const tweetsList = ['tweet 1', 'tweet2', 'tweet3', 'tweet4'];
    return Promise.all(tweetsList.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(4);
      }); 
  });
  // To Do
  // it('finds a tweet and updates', () => {
  //   return createTweet('tweet 2', 'Tweet typo')
  //     .then((createdTweet) => {
  //       const id = createdTweet._id;
  //       return request(app)
  //         .put(`/tweets/${id}`)
  //         .send({
  //           handle: 'tweet 2',
  //           text: 'Updated tweets are working'
  //         })
  //         .then(res => {
  //           expect(res.body).toEqual({
  //             handle: 'tweet 2',
  //             text: 'Update tweets are working',
  //             _id: expect.any(String)
  //           });
  //         });
  //     });
  // });
});

