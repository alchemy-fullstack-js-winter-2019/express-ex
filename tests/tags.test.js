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
    return createTag('#yolo')
      .then(createdTag => {
        return request(app) 
          .get(`/tags/${createdTag._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: '#yolo',
              _id: expect.any(String)
            });
          });
      });
  });
  it('updates a tag with :id and returns the update', () => {
    return createTag('#blessup')
      .then(createdTag => {
        createdTag.name = '#turntup';
        return request(app)
          .put(`/tags/${createdTag._id}`)
          .send(createdTag);
      })
      .then(res => {
        expect(res.body.name).toContain('#turntup');
      });
  });
  it('deletes a tag with :id and returns the delete count', () => {
    return createTag('#ballerforlyfe')
      .then((createdTag) => {
        const id = createdTag._id;
        return request(app)
          .delete(`/tags/${id}`)
          .then(res => {
            expect(res.body).toEqual({ 'deleted': 1 });
          });
      });
  });
  it('errors when there is no tag with an id', () => {
    return request(app)
      .get('/tags/badId')
      .then(res => {
        expect(res.status).toEqual(500);
        expect(res.body).toEqual({ error: expect.any(String) });
      });
  });
});

