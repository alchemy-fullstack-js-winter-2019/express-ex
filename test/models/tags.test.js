const app = require('../../lib/app');
const mkdirp = require('mkdirp');
const request = require('supertest');
const rimraf = require('rimraf');

const makeTag = (text) => {
  return request(app)
    .post('/tags')
    .send({
      tag: `#${text}`
    })
    .then(res => res.body);
};

describe('tweets', () => {

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

  it('creates a new hashtag', () => {
    return request(app)
      .post('/tags')
      .send({ tag: '#threedayweekend' })
      .then(res => {
        expect(res.body).toEqual({ 
          tag: '#threedayweekend',
          _id: expect.any(String) 
        });
      });
  });

  it('returns a list of tags', () => {
    return Promise.all(['hashtag1', 'hashtag2', 'hashtag3'].map(tag => { 
      makeTag(tag);
    }))
      .then(() => {
        return request(app)
          .get(`/tags`);
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });

  it('gets a tag by id', () => {
    return makeTag('hashtag')
      .then(newTag => {
        const id = newTag._id;
        return request(app)
          .get(`/tags/${id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          tag: '#hashtag',
          _id: expect.any(String)
        });
      });
  });

  it('gets a tag and updates by id', () => {
    return makeTag('hashtag')
      .then(oldTag => {
        const id = oldTag._id;
        return request(app)
          .put(`/tags/${id}`)
          .send({
            tag: '#updatehashtag',
            _id: id
          })
          .then(() => {
            return request(app)
              .get(`/tags/${id}`)
              .then(res => {
                expect(res.body).toEqual({
                  tag: '#updatehashtag',
                  _id: expect.any(String)
                });
              });
          });
      });
  });

  it('gets a tag by id and deletes', () => {
    return makeTag('tagtodelete')
      .then(tag => {
        const id = tag._id;
        return request(app)
          .delete(`/tags/${id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });

});
