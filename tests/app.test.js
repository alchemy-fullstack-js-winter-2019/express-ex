const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const createTweet = handle => {
  return request(app)
    .post('/tweets')
    .send({
      handle: handle,
      tweet: 'my tweeter tweets'
    })
    .then(res => res.body);
};

describe('tweets', () => {
  beforeEach(done => {
    rimraf('./data/tweets', done);
  });

  beforeEach(done => {
    mkdirp('./data/tweets', done);
  });
  
  it('creates a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'teonna', text: 'my first tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'teonna',
          text: 'my first tweet',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of tweets', () => {
    const handles = ['TA1', 'TA2', 'TA3'];
    return Promise.all(handles.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets')
          .then(res => {
            expect(res.body).toHaveLength(3);
          });
      });
  });

  it('gets a tweet by id', () => {
    return createTweet('T_on_A')
      .then(createdTweet => {
        const id = createdTweet._id;
        return request(app)
          .get(`/tweets/${id}`);
      })
      .then(res => {
        expect(res.body.handle).toEqual('T_on_A');
      });
  });
  it('updates a tweet', () => {
    return createTweet('TT')
      .then(createdTweet => {
        const id = createdTweet._id;
        return request(app)
          .put(`/tweets/${id}`)
          .send({
            handle: 'TA',
            text: 'my TWEET',
            _id: id
          })
          .then(() => {
            return request(app)
              .get(`/tweets/${id}`)
              .then(res => {
                expect(res.body).toEqual({
                  handle: 'TA',
                  text: 'my TWEET',
                  _id: id
                });
              });
          });
      });
  });

});
