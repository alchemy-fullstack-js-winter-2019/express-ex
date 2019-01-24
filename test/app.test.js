const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('supertest');

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
        expect(res.body).toEqual({
          handle: 'ryan',
          text: 'I am a tweet',
          _id: expect.any(String)
        });//res.body or res.text

      });
  });
  it('gets a tweet by id', () => {
    return createTweet('tweet 1', 'I am a tweet') //creating a tweet that we can get by id
      .then((createdTweet) => { //(tweet => {then we try to get the tweet by id
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
  //TODO
  // it('errors when no tweet with id', () => {
  //   return request(app)
  //     .get('/tweets/badId')
  //     .then(res => {
  //       expect(res.status).toEqual(500);
  //       expect(res.body).toEqual({ error: 'Bad Id: badId' });
  //     });
  // });
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
 
  it('finds a tweet and updates', () => {
    return createTweet('TweetTypo')
      .then((createdTweet) => { //tweet
        const id = createdTweet._id;
        return request(app)
          .put(`/tweets/${id}`)
          .send({ //send the updated object
            handle: 'tweet 2',
            text: 'Tweet'
          })
          .then(res => {
            expect(res.body.text).toEqual('Tweet');
          });
      });
  });


  it('can delete a tweet', () => {
    return createTweet('Tweet')
      .then(tweet => {
        return request(app)
          .delete(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});

