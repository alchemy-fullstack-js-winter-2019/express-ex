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

  const createTweet = (name) => {
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

  }
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

  it('gets a list of tweets from db', () => {
    const tweetsToCreate = ['hello', 'hola', 'shalom'];
    return Promise.all(tweetsToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then({ body }) () => {
        expect(body).toHaveLength(3);
      }
  });
    
  it('can delete tweets by id', () => {
    
  });
});


