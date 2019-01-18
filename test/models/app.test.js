const request = ('supertest');
const app = require('../../lib/app');

describe('tweets', () => {
  if('gets a tweet', () => {
    return request(app)
      .get('/tweets/abcd')
        .then(res => {
            expect(res.text).toEqual('abcd');
        });
  });
});
