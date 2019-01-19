const request = require('supertest');
const app = require('../lib/app');

describe('tweets', () => {
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
