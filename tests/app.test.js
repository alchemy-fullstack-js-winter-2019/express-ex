const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const createTweet = (handle) => {
  return request(app)
    .post('/tweets')
    .send({
      handle: handle,
      text: 'my first tweet'
    })
    .then(res => res.body);
};

const createTag = (tag) => {
  return request(app)
    .post('/tags')
    .send({
      tag: tag,
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
  it('gets a single tweet by id', () => {
    return createTweet('tyler')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .get(`/tweets/${_id}`)
          .then(res => {
            expect(res.body).toEqual({
              handle: 'tyler',
              text: 'my first tweet',
              _id: _id
            });
          });
      });
  });
  it('updates a tweet by id', () => {
    return createTweet('tyler')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .put(`/tweets/${_id}`)
          .send({ handle: 'tyler', text: 'revised tweet' })
          .then(res => {
            expect(res.body).toEqual({
              handle: 'tyler',
              text: 'revised tweet',
              _id: _id
            });
          });
      });
  });
  it('deletes a tweet by id', () => {
    return createTweet('tyler')
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


describe('tags', () => {
  beforeEach(done => {
    rimraf('./data/tags', err => {
      done(err);
    });
  });
  beforeEach(done => {
    mkdirp('./data/tags', err => {
      done(err);
    });
  });

  it('gets a list of tags', () => {
    const tagsToMake = ['#swag', '#BigBallerBrand', '#code'];
    return Promise.all(tagsToMake.map(createTag))
      .then(() => {
        return request(app)
          .get('/tags');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });
  it('posts a tag', () => {
    return request(app)
      .post('/tags')
      .send({ tag: '#yolo' })
      .then(res => {
        expect(res.body).toEqual({ 
          tag: '#yolo',  
          _id: expect.any(String)
        });
      });
  });
  it('gets a single tag by id', () => {
    return createTag('#PokemonGo2ThePolls')
      .then(createdTag => {
        const _id = createdTag._id;
        return request(app)
          .get(`/tags/${_id}`)
          .then(res => {
            expect(res.body).toEqual({
              tag: '#PokemonGo2ThePolls',
              _id: _id
            });
          });
      });
  });
  it('updates a tag by id', () => {
    return createTag('#DabOnHaters')
      .then(createdTag => {
        const _id = createdTag._id;
        return request(app)
          .put(`/tags/${_id}`)
          .send({ handle: '#JavaScript' })
          .then(res => {
            expect(res.body).toEqual({
              handle: '#JavaScript',
              _id: _id
            });
          });
      });
  });
  it('deletes a tweet by id', () => {
    return createTweet('#RoboRyan')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .delete(`/tags/${_id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });
});
