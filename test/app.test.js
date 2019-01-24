const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('supertest');
const app = require('../lib/app');

describe('tweets tests', () => {
  const createTweet = (handle, text) => {
    return request(app)
      .post('/tweets')
      .send({
        handle,
        text
      })
      .then(res => res.body);
  };

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

  describe('tweets', () => {
    it('creates a new tweet', () => {
      return request(app)
        .post('/tweets')
        .send({ handle: 'tweety', text: 'my first tweet' })
        .then(res => {
          expect(res.body).toEqual({
            handle: 'tweety',
            text: 'my first tweet',
            _id: expect.any(String)
          });
        });
    });
    it('gets a tweet by id', () => {
      return createTweet('tweet1', 'I am a tweet')
        .then(createdTweet => {
          const id = createdTweet._id;
          return request(app)
            .get(`/tweets/${id}`);
        })
        .then(res => {
          expect(res.body).toEqual({ handle:'tweet1', text: 'I am a tweet', _id: expect.any(String) });
        });
    });

    it('errors when there is no tweet with id', () => {
      return request(app)
        .get('/tweets/badId')
        .then(res => {
          expect(res.status).toEqual(400);
          expect(res.body).toEqual({ error: 'Bad Id: badId' });
        });
    });

    it('gets a list of tweets from db', () => {
      const tweetsToCreate = ['tweet1', 'tweet2', 'tweet3'];
      return Promise.all(tweetsToCreate.map(createTweet))
        .then(() => {
          return request(app)
            .get('/tweets');
        })
        .then(({ body }) => {
          expect(body).toHaveLength(3);
        });
    });

    it('gets a tweet by id and update', () => {
      return createTweet('tweet tweet')
        .then(createdTweet => {
          const id = createdTweet._id;
          return request(app)
            .put(`/tweets/${id}`)
            .send({
              handle: 'tweet 5',
              text: 'tweet back',
              _id: id
            })
            .then(() => {
              return request(app)
                .get(`/tweets/${id}`)
                .then(res => {
                  expect(res.body).toEqual({
                    handle: 'tweet 5',
                    text: 'tweet back',
                    _id: id
                  });
                });
            });
        });
    });
    it('delete tweet by id', () => {
      return createTweet('tweeet')
        .then(createdTweet => {
          const id = createdTweet._id;
          return request(app)
            .delete(`/tweets/${id}`)
            .then(res =>  {
              expect(res.body).toEqual({
                deleted: 1
              });
            });
        });
    });
  });
});


const createTag = (name, id) => {
  return request(app)
    .post('/tags')
    .send({
      name,
      id
    })
    .then(res => res.body);
};

describe('tags tests', () => {
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
  describe('tags', () => {
    it('creates a new tag', () => {
      return request(app)
        .post('/tags')
        .send({ name: '#1' })
        .then(res => {
          expect(res.body).toEqual({
            name: '#1',
            _id: expect.any(String)
          });
        });
    });
    it('gets a tag by id', () => {
      return createTag('#LOL')
        .then(createdTag => {
          const id = createdTag._id;
          return request(app)
            .get(`/tags/${id}`);
        })
        .then(res => {
          expect(res.body).toEqual({ name: '#LOL', _id: expect.any(String) });
        });
    });
    it('gets a list of tags', () => {
      const tagsToCreate = ['#TGIF', '#FOMO', '#10YRCHALLENGE'];
      return Promise.all(tagsToCreate.map(createTag))
        .then(() => {
          return request(app)
            .get('/tags/');
        })
        .then(({ body }) => {
          expect(body).toHaveLength(3);
        }
        );
    });
    it('gets a tag by id and update', () => {
      return createTag('#BFF')
        .then(createdTag => {
          const id = createdTag._id;
          return request(app)
            .put(`/tags/${id}`)
            .send({
              name: '#BFFs',
              _id: id 
            })
            .then(() => {
              return request(app)
                .get(`/tags/${id}`)
                .then(res => {
                  expect(res.body).toEqual({
                    name: '#BFFs',
                    _id: id
                  });
                });
            });
        });
    });
    it('gets a tag by id and delete', () => {
      return createTag('#sundayfunday')
        .then(createdTag => {
          const id = createdTag._id;
          return request(app)
            .delete(`/tags/${id}`)
            .then(res => {
              expect(res.body).toEqual({
                deleted: 1
              });
            });
        });
    });
  });
});
