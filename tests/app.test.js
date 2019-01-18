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
    return request(app)
      .post('/tweets/abcd')
      .then(res => {
        expect(res.text).toEqual('abcd');
      });
  });

  it('gets tweets by id', () => {
    return request(app)
      .get('/tweets/abcd/1234')
      .then(res => {
        expect(res.id).toEqual('id');
      });
  });

  it('puts tweets by id', () => {

  });

  it('can delete tweets by id', () => {

  });

});
