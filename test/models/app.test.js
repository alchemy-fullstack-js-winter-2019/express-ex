const request = require('supertest');
const app = require('../../lib/app');

const mkdirp = require('mkdirp');
const rimraf = require('rimraf'); 

const createTweet = (handle) => {
  return request(app)
    .post('/tweets')
    .send({
      handle: handle,
      text: 'dogs are the best'
    })
    .then(res => res.body);
};
describe('gets people', () => {
  beforeEach(done => {
    rimraf('./data/tweets', err => {
      done(err);
    });
  });
  beforeEach((done) => {
    mkdirp('./data/tweets', err => {
      done(err);
    });
  }); 
  it('gets all the tweets', () => {
    const namesToCreate = ['marcy1', 'marcy2', 'marcy3', 'marcy4'];
    return  Promise.all(namesToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(4);
      });
  });
});
it('gets tweets by ID', () => {
  return createTweet('marcy1')
    .then(TweetWhoWasCreated => {
      const id = TweetWhoWasCreated._id;
      return request(app)
        .get(`/tweets/${id}`)
        .then(res => {
          expect(res.body).toEqual({ handle: 'marcy1', text: 'dogs are the best', _id: expect.any(String) });
        });
    });
});
it('finds a tweet by ID and updates it', () => {
  return createTweet('marcy1')
    .then(personWhoWasCreated => {
      const id = personWhoWasCreated._id;
      const updatedObject = ({ handle: 'marcy2',
        text: 'cats are better',
        _id: expect.any(String)
      });
      return request(app) 
        .put(`/tweets/${id}`)
        .send(updatedObject)
      /* eslint-disable-next-line*/
          .then(res => {
          expect(res.body).toEqual({
            handle: 'marcy2',
            text: 'cats are better',
            _id: expect.any(String) 
          });
        });
    });
});
it('deletes a tweet', () => {
  return createTweet('marcy1')
    .then(TweetWhoWasCreated => {
      const id = TweetWhoWasCreated._id;
      return request(app) 
        .delete(`/tweets/${id}`)
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
});
it('sends a tweet', () => {
  return request(app)
    .post('/tweets')
    .send({ handle: 'marcy', text: 'first tweet' })
    .then(res => {
      expect(res.body).toEqual({ handle: 'marcy', text: 'first tweet', _id: expect.any(String) });
    });
});
it('errors when there is no tweet', () => {
  return request(app) 
    .get('/tweets/badId')
    .then(res => {
      expect(res.status).toEqual(400);
      expect(res.body).toEqual({ error: 'Bad Id: badId' });
    });
});
