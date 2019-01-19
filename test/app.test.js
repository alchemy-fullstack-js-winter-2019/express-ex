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
const createTag = name => {
  return request(app)
    .post('/tags')
    .send({
      name
    })
    .then(res => res.body);
};

// APP ------------------------------------------
describe('tweets', () => {
  beforeAll(done => {
    createTweet('buggaboo');
    mkdirp('./data/tweets', done);
    mkdirp('./data/tags', done);
    done();
  });
  afterEach(done => {
    rimraf('./data/tweets/*', done);
    rimraf('./data/tags/*', done);
    done();
  });
  afterAll(done => {
    createTweet('bo');
    createTag('#TLC');
    done();
  });

  // CREATE ------------------------------------------
  it('can post a new tweet', () => {
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
  it('can post a new tag', () => {
    return request(app)
      .post('/tags')
      .send({ name: '#jellybean' })
      .then(res => {
        expect(res.body).toEqual({
          name: '#jellybean',
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

  // PUT ------------------------------------------
  it('updates a tweet with :id and returns the update', () => {
    let newTweet = {
      handle: 'hollllaaaa',
      text: 'can you believe this *&#(*@???'
    };
    return createTweet('pizzatown')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .put(`/tweets/${_id}`)
          .send(newTweet);
      })
      .then(res => {
        expect(res.body.handle).toEqual('hollllaaaa');
      });
  });

  // DELETE ------------------------------------------
  it('can delete a tweet with :id and return the delete count', () => {
    return createTweet('alo')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .delete(`/tweets/${_id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });
});
