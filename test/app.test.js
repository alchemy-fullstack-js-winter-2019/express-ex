const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const createTweet = (text, handle = 'jei jei') => {
  return request(app)
    .post('/tweets')
    .send({ handle, text })
    .then(res => res.body);
};

const createTag = name => {
  return request(app)
    .post('/tags')
    .send({ name })
    .then(res => res.body);
};

describe('tweets', () => {
  beforeEach(done => {
    rimraf('./data/tweets/*', err => {
      done(err);
    });
    rimraf('./data/tags/*', err => {
      done(err);
    });
  });
  beforeEach(done => {
    mkdirp('./data/tweets', err => {
      done(err);
    });
    mkdirp('./data/tags', err => {
      done(err);
    });
  });
  
  it('creates a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'jei', text: 'tweetie' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'jei',
          text: 'tweetie',
          _id: expect.any(String)
        });
      });
  });
  it('creates a new tag', () => {
    return request(app)
      .post('/tags')
      .send({ name: '#snoop' })
      .then(res => {
        expect(res.body).toEqual({
          name: '#snoop',
          _id: expect.any(String)
        });
      });
  });
  
  it('gets list of tweets', () => {
    const tweetsToCreate = ['redfish', 'twofish', 'bluefish'];
    return Promise.all(tweetsToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });

  it('can get list of tags', () => {
    const tagsToCreate = ['#westside', '#tired', '#gotobed'];
    return Promise.all(tagsToCreate.map(createTag))
      .then(() => {
        return request(app)
          .get('/tags');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });

  it('gets a tweet by id', () => {
    return createTweet('rowboat')
      .then(createdTweet=> {
        const _id = createdTweet._id;
        return request(app)
          .get(`/tweets/${_id}`)
          .then(res => {
            expect(res.body).toEqual({
              handle: 'jei jei',
              text: 'rowboat',
              _id
            });
          });
      });
  });
  it('can get tag by id', () => {
    return createTag('#westside')
      .then(createdTag => {
        const _id = createdTag._id;
        return request(app)
          .get(`/tags/${_id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: '#westside',
              _id
            });
          }); 
      });
  });

  it('updates a tweet by :id', () => {
    let newTweet = {
      handle: 'hi',
      text: 'test'
    };
    return createTweet('skoolio')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .put(`/tweets/${_id}`)
          .send(newTweet);
      })
      .then(res => {
        expect(res.body.handle).toEqual('hi');
      });
  });

  it('update tag with :id', () => {
    let newTag = { name: '#jeiz' };
    return createTag('#bb')
      .then(createdTag => {
        const _id = createdTag._id;
        return request(app)
          .put(`/tags/${_id}`)
          .send(newTag);
      })
      .then(res => {
        expect(res.body.name).toEqual('#jeiz');
      });
  });

  it('can delete a tweet', () => {
    return createTweet('gotobed')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .delete(`/tweets/${_id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });
  it('can delete tag', () => {
    return createTag('#skoolwork')
      .then(createdTag => {
        const _id = createdTag._id;
        return request(app)
          .delete(`/tags/${_id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });

  it('error when no tweet by id', () => {
    return request(app)
      .get('/tweets/badId')
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ error: 'Bad id: badId' });
      });
  });
});
