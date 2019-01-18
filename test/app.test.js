const request = require('supertest');
const app = require('../lib/app');

describe('tweets', () => {
  it('gets a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'pizza', text: 'I am a tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'pizza',
          text: 'I am a tweet',
          _id: expect.any(String)
        });
      });
  });
});
