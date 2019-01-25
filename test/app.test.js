const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const createTweet = handle => {
  return request(app)
    .post('/tweets')
    .send({
      handle,
      text: 'hi there'
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
      .send({ handle: 'carmen', text: 'my first tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'carmen', text: 'my first tweet', _id: expect.any(String) 
        });
      });
  });

  it('gets a list of tweets', () => {
    const tweetsToCreate = ['carmen1', 'carmen2', 'carmen3'];
    return Promise.all(tweetsToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });

  it('gets a tweet by id', () => {
    return createTweet('carmen1')
      .then(tweetCreated => {
        const _id = tweetCreated._id;
        return request(app)
          .get(`/tweets/${_id}`)
          .then(res => {
            expect(res.body).toEqual({
              handle: 'carmen1', 
              text: 'hi there', 
              _id  
            });
          });
      });
  });
  
  it('gets tweet by id and return an updated tweet', () => {
    const updatedTweet = {
      handle: 'carmen1',
      test: 'God is good all the time!'
    };
    return createTweet('helloworld')
      .then(tweetCreated => {
        const _id = tweetCreated._id;
        return request(app)
          .put(`/tweets/${_id}`)
          .send(updatedTweet);
      })
      .then(res => {
        expect(res.body.handle).toEqual('carmen1');
      });
  });

  it('retrieves a tweet by :id, delete, and return the delete count', () => {
    return createTweet('alo')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .delete(`/tweets/${_id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });

  it('errors when there is no tweet with an id', () => {
    return request(app)
      .get('/tweets/badId')
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ error: 'Bad Id' });
      });
  });
});

// Tags Tests Here


describe('tags', () => {
  beforeEach(done => {
    rimraf('./data/tags', err => {
      done(err);
    });
  });

  beforeEach(done => {
    mkdirp('./data/tags', err => {
      done(err);
    });
  });

  it('creates a new tag', () => {
    return request(app)
      .post('/tags')
      .send({ name: '#carmen', _id: '123' })
      .then(res => {
        expect(res.body).toEqual({
          name: '#carmen', _id: expect.any(String) 
        });
      });
  });

});
