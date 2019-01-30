/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const request = require('supertest');
const app = require('../lib/app');

const mkdirp = require('mkdirp');
const rimraf = require('rimraf'); 


describe('tweets', () => {
  const createTweet = (text, handle = 'abel') => {
    return request(app)
      .post('/tweets')
      .send({ handle, text })
      .then(res => res.body);
  };

  beforeEach(done => {
    rimraf('./data/tweets', err => {
      done(err);
    });
  });
  beforeEach((done) => {
    mkdirp('./data/tweets', err => {
      done(err);
    });
  }); 


  it('gets a tweet by id', () => {
    return createTweet('my first tweet')
      .then(createdTweet => {
        return Promise.all([
          Promise.resolve(createdTweet._id),
          request(app)
            .get(`/tweets/${createdTweet._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          _id: _id,
          text: 'my first tweet',
          handle: 'abel'
        });

      });
  });


  it('gets a list of tweets', () => {
    const tweetsToCreate = ['hello', 'hola', 'shalom', 'bonjour'];
    return Promise.all(tweetsToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(4);
      });
  });

  it('gets a tweet by id and updates', () => {
    return createTweet('a tweet')
      .then(tweet => {
        const id = tweet._id;
        return request(app)
          .put(`/tweets/${id}`)
          .send({ ...tweet, text: 'a tweet' });
      })
      .then(res => {
        expect(res.body.text).toEqual('a tweet');
      });
  });


  it('gets a tweet by id and deletes', () => {
    return createTweet('this will be deleted')
      .then(newTweet => {
        const id = newTweet._id;
        return request(app)
          .delete(`/tweets/${id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });

  it('can send a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'abel', text: 'is this how i tweet' })
      .then(res => {
        expect(res.body).toEqual({ handle: 'abel', text: 'is this how i tweet', _id: expect.any(String) });
      });
  });

  it('errors when there is no tweet with an id', () => {
    return request(app)
      .get('/tweets/badId')
      .then(res => {
        expect(res.status).toEqual(500);
      });
  });
});
