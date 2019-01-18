const request = require('supertest');
const app = require('../lib/app');

describe('tweets', () => {
  it('posts a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'ryan', text: 'my first tweet' })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'ryan', 
          text: 'my first tweet', 
          _id: expect.any(String)
        });
      });
  });
});

