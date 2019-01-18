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

  it('posts a tweet', () => {

  });

  it('gets tweets by id', () => {

  });

  it('puts tweets by id', () => {

  });

  it('can delete tweets by id', () => {

  });

});
