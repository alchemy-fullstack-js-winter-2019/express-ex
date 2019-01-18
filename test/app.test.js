const request = request('supertest');
const app = require('../lib/app');

describe('tweets', () => {
  it('creates a new tweet', () => {
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

  it('gets a list of tweets', () => {
    return request(app)
      .get('/tweets')
      .then(res => {
        expect(res.body).toEqual()
      })
  });
});