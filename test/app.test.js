const app = require('../lib/app');
const request = require('supertest');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('test tweets', () => {
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
    
    it('can post a tweet', () => {
        return request(app)
            .post('/tweets')
            .send({
                tweet: 'KAAACAHHH',
                handle: 'lance'
            })
            .then(res => {
                expect(res.body.handle).toContain('lance');
            });
    });


    it('can get a tweet', () => {
        return request(app)
            .get('/tweets/abcd')
            .then(res => {
                expect(res.text).toEqual('abcd');
            });
    });

});
