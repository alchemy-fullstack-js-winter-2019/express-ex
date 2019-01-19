const request = require('supertest');
const app = require('../lib/app');

let tweet = null;
describe('tweets', () => {
  beforeEach(done => {
    if(!tweet) {
      done();
    } 
    else {
      request(app)
        .delete(`/tweets/${tweet._id}`)
        .then(() => done());
    }
  });

  beforeEach(done => {
    request(app)
      .post('/tweets')
      .send({
        handle: 'shabz',
        text: 'I am a twit',
        _id:'1'
      })
      .then(res => {
        tweet = res.body;
        done();
      });
  });

  it('deletes a tweet', () => {
    return request(app)
      .delete(`/tweets/${tweet._id}`)
      .then(res => expect(res.body).toEqual({
        deleted: 1
      }));
  });

  it('updates a tweet', () => {
    return request(app)
      .put(`/tweets/${tweet._id}`)
      .send({
        text: 'I meant tweet'
      })
      .then(res => expect(res.body).toEqual({
        handle: 'shabz',
        text: 'I meant tweet',
        _id:'1'
      }));
  });

  it('gets all tweets', () => {
    return request(app)
      .get('/tweets')
      .then(res => expect(res.body).toEqual({
        1 : {
          handle: 'shabz',
          text: 'I am a twit',
          _id:'1'
        }
      }));
  });

  it('gets a tweet by id', () => {
    let added = null;
    return request(app)
      .post('/tweets')
      .send({
        handle: 'shabz2',
        text: 'I am a twit also',
        _id:'2'
      })
      .then(res => {
        added = res.body;
        return request(app)
          .get(`/tweets/${added._id}`)
          .then(resp => expect(resp.body).toEqual(added));
      });
  });
});
