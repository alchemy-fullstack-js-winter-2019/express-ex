const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const createTags = (name) => {
  return request(app)
    .post('/tags')
    .send({
      name: name
    })
    .then(res => res.body);
};

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

  it('gets a tag', () => {
    return request(app)
      .get('/tags/abcd')
      .then(res => {
        expect(res.text).toEqual('abcd');
      });
  });

  it('can post a tag', () => {
    return request(app)
      .post('/tags')
      .send({
        name: '#js'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: '#js',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of all tags', () => {
    return Promise.all(['#Aaron1', '#Aaron2', '#Aaron3', '#Aaron4', '#Aaron5'].map(name => {
      return createTags(name);
    }))
      .then(() => {
        return request(app)
          .get('/tags');
      })
      .then(res => {
        expect(res.body).toHaveLength(5);
      });
  });

  it('it finds by id and updates object', () => {
    return createTags('#Peter')
      .then(createdTags => {
        createdTags.name = '#Peter2';
        return request(app)
          .put(`/tags/${createdTags._id}`)
          .send(createdTags);
      })
      .then(res => {
        expect(res.text).toContain('#Peter2');
      });
  });

  it('finds by id and deletes object', () => {
    return createTags('#Peter')
      .then(createdTags => {
        const id = createdTags._id;
        return request(app)
          .del(`/tags/${id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 'deleted': 1 });
      });
  });

  it('returns 404 not found if given the wrong route', () => {
    return request(app)
      .get('/foo/bar')
      .expect(404);
  });
});
