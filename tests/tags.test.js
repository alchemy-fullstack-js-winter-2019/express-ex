const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const createTag = (name) => {
  return request(app)
    .post('/tags')
    .send({ 
      name: name
    })
    .then(res => res.body);
};

describe('tags', () => {
  beforeEach((done) => {
    rimraf('./lib/data/tags', err => {
      done(err);
    });
  });

  beforeEach((done) => {
    mkdirp('./lib/data/tags', err => {
      done(err);
    });
  });

  it('creates a new tag', () => {
    return request(app)
      .post('/tags')
      .send({
        name: '#blessup'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: '#blessup', 
          _id: expect.any(String)
        });
      });
  });
  it('can list all the tags in the database', () => {
    const names = ['#blessup', '#thisissolit', '#nofilter', '#ididntchoosethethuglifethethuglyfechoseme'];
    return Promise.all(names.map(createTag))
      .then(() => {
        return request(app)
          .get('/tags');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(4);
      });
  });
  it('gets a tag by id', () => {
    return request(app)
      .get('/tags/abcd')
      .then(res => {
        expect(res.text).toEqual('abcd');
      });
  });
  // it('updates a tweet with :id and returns the update', () => {
  //   return createTweet('kristin1')
  //     .then(createdTweet => {
  //       createdTweet.handle = 'test';
  //       return request(app)
  //         .put(`/tweets/${createdTweet._id}`)
  //         .send(createdTweet);
  //     })
  //     .then(res => {
  //       expect(res.text).toContain('test');
  //     });
  // });
  // it('deletes a tweet with :id and returns the delete count', () => {
  //   return createTweet('baller for lyfe')
  //     .then((createdTweet) => {
  //       const id = createdTweet._id;
  //       return request(app)
  //         .delete(`/tweets/${id}`)
  //         .then(res => {
  //           expect(res.body).toEqual({ 'deleted': 1 });
  //         });
  //     });
  // });
});

