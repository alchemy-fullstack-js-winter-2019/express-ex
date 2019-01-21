const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

//question: do CRUD methods aka put, get, delete, only take url links?

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
  it.only('deletes tweet by id', () => {
    return createTweet('this needs to go down now')
      .then(deleteTweet => {
        const id = deleteTweet._id;
        return request(app)
          .delete(`/tweets/${id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });

      });
  });
  it('gets tweet by id and updates', () => {
    return createTweet('jon slick')
      .then(updateTweet => {
        const id = updateTweet._id;
        return request(app)
          .put(`/tweets/${id}`)
          .send({
            handle: 'johnny',
            text: 'john wick',
            _id: id
          })
          .then(() => {
            return request(app)
              .get(`/tweets/${id}`)
              .then(res => {
                expect(res.body.text).toEqual('john wick');
              });
          });
      });
  });
  it('gets tweet by id', () => {
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
  it('gets all tweets', () => {
    return Promise.all(['tweet1', 'tweet2', 'tweet3'].map(tweets => {
      createTweet(tweets);
    }))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });
});


