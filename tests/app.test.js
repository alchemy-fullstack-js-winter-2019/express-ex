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

  it('creates a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'abel', text: 'my first tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'abel',
          text: 'my first tweet',
          _id: expect.any(String)
        });
      });
  });

  it('gets tweets by id', () => {
    // return request(app)
    //   .get('/tweets/abcd/1234')
    //   .then(res => {
    //     expect(res.id).toEqual('id');
    //   });
  });

  it('puts tweets by id', () => {

  });

  it('can delete tweets by id', () => {

  });

});
