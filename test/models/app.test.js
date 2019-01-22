const app = require('../../lib/app');
const mkdirp = require('mkdirp');
const request = require('supertest');
const rimraf = require('rimraf');


const makeTweet = (text) => {
  return request(app)
    .post('/tweets')
    .send({
      handle: 'katerj',
      text: text
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

  it('creates a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ 
        handle: 'katerj', 
        text: 'my first tweet' 
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'katerj',
          text: 'my first tweet',
          _id: expect.any(String)
        });
      });
  });

  it('gets a tweet by id', () => {
    return makeTweet('Weeee')
      .then(newTweet => {
        const id = newTweet._id;
        return request(app)
          .get(`/tweets/${id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'katerj',
          text: 'Weeee',
          _id: expect.any(String)
        });
      });
  });

  it('errors when there is no tweet with an id', () => {
    return request(app)
      .get('/tweets/badid')
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ error: expect.any(String) });
      });
  });

  it('get a list of tweets', () => {
    return Promise.all(['tweet 1', 'tweet 2', 'tweet 3'].map(tweet => {
      makeTweet(tweet);
    }))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });

  it('gets a tweet by id and updates', () => {
    return makeTweet('tweet with a typo')
      .then(tweetMade => {
        const id = tweetMade._id;
        return request(app)
          .put(`/tweets/${id}`)
          .send({
            handle: 'katerj',
            text: 'update this tweet',
            _id: id
          })
          .then(() => {
            return request(app)
              .get(`/tweets/${id}`)
              .then(res => {
                expect(res.body.text).toEqual('update this tweet');
              });
          });
      });
  });

  it('gets a tweet by id and deletes', () => {
    return makeTweet('tweet to delete')
      .then(tweetMade => {
        const id = tweetMade._id;
        return request(app)
          .delete(`/tweets/${id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });
      
});
