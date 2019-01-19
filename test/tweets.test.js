const request = require('supertest');
const app = require('../lib/app');

let tweet = null;
describe('tweets', () => {
  beforeEach(done => {
    if(!tweet) {
      done();
    } 
    else {
      request(app)
        .delete(`/tweets/${tweet._id}`)
        .then(() => done());
    }
  });

  beforeEach(done => {
    request(app)
      .post('/tweets')
      .send({
        handle: 'shabz',
        text: 'I am a twit',
        _id:'1'
      })
      .then(res => {
        tweet = res.body;
        done();
      });
  });

  it('posts a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'shabz2',
        text: 'I am another twit',
        _id: 2
      })
      .then(res => expect(res.body).toEqual({
        handle: 'shabz2',
        text: 'I am another twit',
        _id: 2
      }));
  });

  it('deletes a tweet', () => {
    return request(app)
      .delete(`/tweets/${tweet._id}`)
      .then(res => expect(res.body).toEqual({
        deleted: 1
      }));
  });
});
