const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const createTweet = (handle) => {
  return request(app)
    .post('/tweets')
    .send({
      handle,
      text: 'rowboat'
    })
    .then(res => res.body);
};

const createHashtag = (name) => {
  return request(app)
    .post('/tags')
    .send({
      name
    })
    .then(res => res.body);
};

describe('routes', () => {
  beforeAll(done => {
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
    createTweet('bob');
    createHashtag('#bob');
    done();
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

  it('gets all the tweets', () => {
    const tweetsToCreate = ['jei1', 'jeie2', 'jei3'];
    return Promise.all(tweetsToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/tweets')
          .then(({ body }) => {
            expect(body).toHaveLength(3);
          });
      });
  });

  it('gets a tweet by id', () => {
    return createTweet('rowboat')
      .then(res => {
        return request(app)
          .get(`/tweets/${res._id}`)
          .then(({ body }) => {
            expect(body).toEqual({
              handle: 'cptnjohn',
              text: 'rowboat',
              _id: expect.any(String)
            });
          });
      });
  });

  it('updates a tweet with :id and returns the update', () => {
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
        expect(res.body.handle).toEqual('h');
      });
  });

  it('can delete a tweet', () => {
    return createTweet('gotobed')
      .then(res => {
        return request(app)
          .delete(`/tweets/${res._id}`);
      })
      .then(({ body }) => {
        expect(body).toEqual({ deleted: 1 });
      });
  });

});

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

it('creates a new hashtag', () => {
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

it('can get all tags', () => {
  const tagsToCreate = ['#westside', '#tired', '#gotobed', '#2pac'];
  return Promise.all(tagsToCreate.map(createHashtag))
    .then(() => {
      return request(app)
        .get('/tags')
        .then(({ body }) => {
          expect(body).toHaveLength(4);
        });
    });
});

it('can get tag by id', () => {
  return createHashtag('#westside')
    .then(res => {
      return request(app)
        .get(`/tags/${res._id}`)
        .then(res => {
          expect(res.body).toEqual({
            name: '#2pac',
            _id: expect.any(String)
          });
        }); 
    });
});

it('update tag with :id and return update', () => {
  let newTag = { name: '#jeiz' };
  return createHashtag('#tired')
    .then(createdTag => {
      const _id = createdTag._id;
      return request(app)
        .put(`/tags/${_id}`)
        .send(newTag);
    })
    .then(res => {
      expect(res.body.name).toEqual('#tired');
    });
});

it('can delete tag', () => {
  return createHashtag('#gotobed')
    .then(res => {
      return request(app)
        .delete(`/tags/${res._id}`);
    })
    .then(({ body }) => {
      expect(body).toEqual({ deleted: 1 });
    });
});
