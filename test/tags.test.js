const request = require('supertest');
const app = require('../lib/app');

let tag = null;
describe('tags', () => {
  beforeEach(done => {
    if(!tag) {
      done();
    } 
    else {
      request(app)
        .delete(`/tags/${tag._id}`)
        .then(() => done());
    }
  });

  beforeEach(done => {
    request(app)
      .post('/tags')
      .send({
        name: '#thestruggleisreal',
        _id:'1'
      })
      .then(res => {
        tag = res.body;
        done();
      });
  });

  it('deletes a tag', () => {
    return request(app)
      .delete(`/tags/${tag._id}`)
      .then(res => expect(res.body).toEqual({
        deleted: 1
      }));
  });
});
