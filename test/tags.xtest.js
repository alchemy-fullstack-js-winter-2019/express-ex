const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

///testing for Tags
const CreateTag = (tag, _id) => {
  return request(app)
    .post('/tags')
    .send({
      tag: tag,
      id: _id
    })
    .then((res) => {
      res.body;
      
    });
};
describe('tags', () => {
  beforeEach((done) => {
    rimraf('./data/tags', (err) => {
      done(err);
    });
  });
  beforeEach(done => {
    mkdirp('./data/tags', err => {
      done(err);
    });
  });
  it('makes a new tag', ()=> {
    return request(app)
      .post('/tags')
      .send({
        name: '#johnny',
        
      })
      .then(res => {
        expect(res.body).toEqual({ 
          name: '#johnny', 
          _id: expect.any(String) });
      });
  });
  it('gets all tags', ()=> {
    return Promise.all(['tag 1', 'tag 2', 'tag 3'].map(tags => {
      CreateTag(tags);
    }))
      .then(() => {
        return request(app)
          .get('/tags');
      })
      .then((res) => {
        expect(res.body).toHaveLength(3);
      });
  });
  //need to come back to this
  it.only('gets tags by id', () => {
    return CreateTag('#okayy')
      .then(newTag => {
        const id = newTag;
        return request(app)
          .get(`/tags/${id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: '#okayy',
          _id: expect.any(String)
        });
      });
  });
  it('find by Id an delete tag', () => {
    return CreateTag('#deleteThis')
      .then(deleteTag => {
        const id = deleteTag._id;
        return request(app)
          .delete(`/tags/${id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });
});
