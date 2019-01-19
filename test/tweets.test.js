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
        .del(`/tweets/${tweet._id}`)
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
        handle: 'shabz',
        text: 'I am a twit',
        _id:'1'
      })
      .then(res => expect(res.body).toEqual({
        handle: 'shabz',
        text: 'I am a twit',
        _id:'1'
      }));
  });


});
