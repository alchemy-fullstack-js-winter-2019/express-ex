const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const createTag = (tag) => {
  return request(app)
    .post('/tags')
    .send({
      group: 'COOLTHINGS',
      tag: tag
    })
    .then(res => {
      return res.body;
    });
};

describe('test tag routes', () => {
  
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

  it('can post a tag', () => {
    return request(app)
      .post('/tags')
      .send({ group: 'hello', tag: 'super cool tag' })
      .then(res => {
        expect(res.body.group).toContain('hello');
      });
  });

  it('can get a list of tags', () => {
    const tags = ['tag1', 'tag2', 'tag3'];
    return Promise.all(tags.map(createTag))
      .then(() => {
        return request(app)
          .get('/tags');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });

  it('can update a tag', () => {
    return createTag('ALOHA')
      .then(createdTag => {
        return request(app)
          .put(`/tags/${createdTag._id}`)
          .send({ ...createdTag, tag: 'cool' });
      })
      .then(res => {
        console.log(res.body);
        expect(res.body.tag).toContain('cool');
      });
  });

  it('can get a tag by id', () => {
    return createTag('something')
      .then(createdTag => {
        return request(app)
          .get(`/tags/${createdTag._id}`);
      })
      .then(res => {
        expect(res.text).toContain('something');
      });
  });

  it('can delete a tag', () => {
    return createTag('fooBar')
      .then(createdTag => {
        return request(app)
          .del(`/tags/${createdTag._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 'deleted': 1 });
      });
  });
});