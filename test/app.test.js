const request = require('supertest');
const app = require('../lib/app');

describe('tweets', () => {
  it('creates a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'ivan', text: 'What up!' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ivan',
          text: 'What up!',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of tweets', () => {

  });
});
