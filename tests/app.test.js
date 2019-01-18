const request = require('supertest');
const app = require('../lib/app');
// const bodyParser = require('../bodyParser');

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
      .post('/tweets')
      .send({ handle: 'ryan', text: 'I am a tweet', _id: '1234' })
      .then(res => {
        expect(res.body.handle).toEqual('ryan');
      });
  });
});

