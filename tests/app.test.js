const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('express server', () => {
  it('creates a new tweets', () => {  
    return request(app)
      .post('/tweet')
      .send({ handle: 'mike', text:'my 1st tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle:'mike',
          text:'my 1st tweet',
          _id: expect.any(String)
        });
      });
  });


});
