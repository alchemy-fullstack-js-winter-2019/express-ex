const request = require('supertest');
const app = require('../lib/app');

const createTweet = (name) => {
  return request(app)
    .post('/tweets')
    .send({
      name: name,
      text: 'my first tweet'
    })
    .then(res => res.body);
};

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
  it('gets a list of tweets', () => {
    const tweetsToMake = ['tyler', 'ryan', 'frank'];
    return Promise.all(tweetsToMake.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });
});

