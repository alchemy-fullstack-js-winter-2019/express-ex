const app = require('../lib/app');
const request = require('supertest');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const createTweet = (handle) => {
    return request(app)
        .post('/tweets')
        .send({
            tweet: 'KAAACAHHH',
            handle: handle
        })
        .then(res => {
            return res.body;
        });
};

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

    it('can gets all', () => {
        const handlesToCreate = ['kananiboy', 'kananiboy2', 'kananiboy3'];
        return Promise.all(handlesToCreate.map(createTweet))
            .then(() => {
                return request(app)
                    .get('/tweets');
            })
            .then(({ body }) => {
                expect(body).toHaveLength(3);
            });
    });

    it('it can update a tweet', () => {
        return createTweet('LANCE')
            .then(createdTweet => {
                createdTweet.handle = 'lanceUPDATED';
                return request(app)
                    .put(`/tweets/${createdTweet._id}`)
                    .send(createdTweet);
            })
            .then(res => {
                expect(res.text).toContain('lanceUPDATED');
            });
    });

    it('can delete a tweet by id', () => {
        return createTweet('lance63')
            .then(createdTweet => {
                return request(app)
                    .del(`/tweets/${createdTweet._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({ "deleted": 1 });
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
