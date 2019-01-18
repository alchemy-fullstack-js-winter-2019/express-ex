const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('supertest');
const app = require('../lib/app');

const createTweet = (handle, text = 'hi I a tweet') => {
  return request(app)
    .post('/tweets')
    .send({
      handle,
      text
    })
    .then(res => res.body);
};

// APP ------------------------------------------
describe('tweets', () => {
  beforeAll(done => {
    createTweet('hi I a tweet');
    mkdirp('./data/tweets', done);
    done();
  });
  afterEach(done => {
    rimraf('./data/tweets/*', done);
    done();
  });
  afterAll(done => {
    createTweet('hi I a tweet');
    done();
  });

  // CREATE ------------------------------------------
  it('gets a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'pizza', text: 'I am a tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'pizza',
          text: 'I am a tweet',
          _id: expect.any(String)
        });
      });
  });
  // GET LIST ------------------------------------------
  it('gets a list of tweets from db', () => {
    const tweetsToCreate = ['hey', 'hi', 'hello', 'hola'];
    return Promise.all(tweetsToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(4);
      });
  });
  // GET by id
  it('gets a tweet by id', () => {
    return createTweet('hayyyyyy')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .get(`/tweets/${_id}`)
          .then(res => {
            expect(res.body).toEqual({
              handle: 'hayyyyyy',
              text: 'hi I a tweet',
              _id
            });
          });
      });
  });
});
