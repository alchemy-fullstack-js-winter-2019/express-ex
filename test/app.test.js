const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const createTweet = handle => {
  return request(app)
    .post('/tweets')
    .send({
      handle: 'ryan',
      text: ''
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
    mkdirp('/data/tweets', err => {
      done(err);
    });
  });

  it('gets a tweet', () => {
    //return Promise.all(['hi', 'bye'].map(createdTweet));
    it('gets a tweet by id', () => {
      return request(app)
        .get('/tweets/abcd')
        .then(res => {
          expect(res.text).toEqual('abcd');
        });
      // return createTweet('ThingOne')
      //   .then(({ _id }) => {
      //     return Promise.all([
      //       Promise.resolve(_id),
      //       request(app).get(`/people/${_id}`)
      //     ]);
      //   })
      //   .then(([_id, { body }]) => {
      //     expect(body).toEqual({
      //       name: 'ryan',
      //       age: 100,
      //       favoriteColor: 'red',
      //       _id
      //     });
      //   });
    });
    // it('gets a list of tweets', () => { //
    //   return request(app)            //ryan's example
    //     .post('/tweets')
    //     .send({ handle: 'ryan', text: 'tweet1' })
    //     .then(() => {
    //       return request(app)
    //         .post('/tweets')
    //         .send({ handle: 'ryan', text: 'tweet2' });
    //     })
    //     .then(() => {
    //       return request(app)
    //         .get('/tweets');
    //     })
    //     .then(({ body }) => {
    //       expect(body).toHaveLength(2);
    //     });
    // });

    // example from previous lab:
    // it('gets a list of people from our db', () => {
    //   const namesToCreate = ['ryan', 'ryan1', 'ryan2', 'ryan3'];
    //   return Promise.all(namesToCreate.map(createPerson))
    //     .then(() => {
    //       return request(app)
    //         .get('/people');
    //     })
    //     .then(({ body }) => {
    //       expect(body).toHaveLength(4);
    //     });
    // });

    // .get('/tweets')  //my first attempt
    // .send([{ handle: 'ryan', text: '1 in my list of tweets' }, { handle: 'ryan', text: '2 in my list of tweets' }, { handle: 'ryan', text: '3 in my list of tweets' }]) 
    // .then(res => {
    //   expect(res.body).toHaveLength(3);
    // });
    //});


  // //   return request(app)
  // //     .get('/tweets/:id') // was: /tweets/abcd
  // //     .send({ text: 'abcd' })//({ handle: 'ryan', text: 'my first tweet' })
  // //     .then(res => {
  // //       expect(res.text).toEqual({
  // //         handle: 'ryan',
  // //         text: 'my first tweet',
  // //         _id: expect.any(String)
  // //       });
  // //     });
  });
});

//post - create
//get id - findById
//get list - find
//put - findByIdAndUpdate
//delete - findByIdAndDelete

