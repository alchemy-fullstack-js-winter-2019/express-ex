const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

///testing for Tags
const CreateTag = text => {
  return request(app)
    .post('/tags')
    .send({
      name: '#okayy',
      text: text
    })
    .then(res => res.body);
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
        name: '#johnny', text: 'text'
        
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
 
  it('gets tags by id', () => {
    return CreateTag('#okayy')
      .then(newT => {
        const id = newT._id;
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
