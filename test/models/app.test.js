const request = require('supertest');
const app = require('../../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const createTweet = (text, handle = 'ryan') => {
  return request(app)
    .post('/tweets')
    .send({
      handle,
      text,
    })
    .then(res => res.body);
};

describe('tweets', () => {
  beforeEach(done => {
    rimraf('./data/tweets', err => {
      done(err);
    });
  });

  beforeEach(done => {
    mkdirp('./data/tweets', err => {
      done(err);
    });
  });

  it('creates a tweet', () => {
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

  it('gets a list of tweets from our db', () => {
    const tweetsToCreate = ['tweet A', 'tweet B', 'tweet C', 'tweet D'];
    return Promise.all(tweetsToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(4);
      });
  });

  it('gets a tweet by id', () => {
    return createTweet('my first tweet')
      .then(createdTweet => {
        return Promise.all([
          Promise.resolve(createdTweet._id),
          request(app)
            .get(`/tweets/${createdTweet._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          text: 'my first tweet',
          handle: 'ryan',
          _id
        });
      });
  });
});

it('updates a tweet by id', () => {
  return createTweet('not updated')
    .then(createdTweet => {
      const _id = createdTweet._id;
      return request(app)
        .put(`/tweets/${_id}`)
        .send({ ...createdTweet, text: 'updated' });
    })
    .then(res => {
      expect(res.body.text).toEqual('updated');
    });
});

it('deletes a tweet by id', () => {
  return createTweet('my tweet')
    .then(createdTweet => {
      return request(app)
        .delete(`/tweets/${createdTweet._id}`);
    })
    .then(res => {
      expect(res.body).toEqual({ deleted: 1 });
    });
});

// it('errs when there is no tweet with an id', () => {
//   return request(app)
//     .get('/tweets/badId')
//     .then(res => {
//       expect(res.status).toEqual(400);
//       expect(res.body).toEqual({ error: 'Bad Id: badId' });
//     });
// });
