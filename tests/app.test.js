const request = require('supertest');
const app = require('../lib/app');



const createTweet = (handle) => {
  return request(app)
    .post('/tweets')
    .send({
      name: handle,
      text: 'my first tweet' })
    .then(res => res.body);
};

describe('tweets', () => {
  it('gets a tweet', () => {
    return request(app)
      .get('/tweets/abcd')
      .then(res => {
        expect(res.text).toEqual('abcd');
      });
  });
});

it('gets a tweet by id', () => {
  return createTweet('abel1')
    .then(createdTweet => {
      const _id = createdTweet._id;
      return request(app)
        .get(`/tweets/${_id}`);
    })
    .then(res => {
      expect(res.body).toEqual({
        handle: 'abel1',
        text: 'hi tweet'
      });
    });
});

it('gets a list of tweets', () => {
  const tweetsToCreate = ['hello', 'hola', 'shalom'];
  return Promise.all(tweetsToCreate.map(createTweet))
    .then(() => {
      return request(app)
        .get('/tweets')
        .then(({ body }) => {
          expect(body).toHaveLength(3);
        });
    });
});
    
it('can send a tweet', () => {
  return request(app)
    .post('/tweets')
    .send({ handle: 'abel', text: 'is this how i tweet' })
    .then(res => {
      expect(res.body).toEqual({ handle: 'abel', text: 'is this how i tweet', _id: expect.any(String) });
    });
});

