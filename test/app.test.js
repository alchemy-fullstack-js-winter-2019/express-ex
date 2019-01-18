const request = require('supertest');
const app = require('../lib/app');

describe('tweets', () => {
  it('gets a tweet', () => {
    return request(app)
      .get('/tweets/abcd')
      .then(res => {
        expect(res.text).toEqual('abcd');
      });
  });

  it('can post a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'Aaron',
        text: 'Hey there',
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Aaron',
          text: 'Hey there',
          _id: expect.any(String)
        });
      });
  });
});
