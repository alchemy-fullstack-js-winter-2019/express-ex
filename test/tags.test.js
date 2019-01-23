const app = require('../lib/app');
const request = require('supertest');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const createTag = (tag) => {
    return request(app)
        .post('/tags')
        .send({
            group: 'COOLTHINGS',
            tag: tag
        })
        .then(res => {
            return res.body;
        });
};

describe('it tests the Tag routes and methods', () => {
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

    it('can post a tag', () => {
        return request(app)
            .post('/tags')
            .send({
                tag: 'SUNSOUTGUNSOUT',
                group: 'Summer fun'
            })
            .then(res => {
                expect(res.body.group).toContain('Summer fun');
            });
    });
    it('can get a list of tags', () => {
        const tags = ['tag', 'tag2', 'tag3'];
        return Promise.all(tags.map(createTag))
            .then(() => {
                return request(app)
                    .get('/tags');
            })
            .then(({ body }) => {
                expect(body).toHaveLength(3);
            });    
    });

    it('it can update a tag', () => {
        return createTag('ALOHA')
            .then(createdTag => {
                createdTag.tag = 'MAHALO';
                return request(app)
                    .put(`/tags/${createdTag._id}`)
                    .send(createdTag);
            })
            .then(res => {
                expect(res.text).toContain('MAHALO');
            });
    });
    it('can delete a tweet by id', () => {
        return createTag('ACL')
            .then(createdTag => {
                return request(app)
                    .del(`/tags/${createdTag._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({ 'deleted': 1 });
            });
    });

    it('can get a single tweet', () => {
        return request(app)
            .get('/tags/YOLO')
            .then(res => {
                expect(res.text).toEqual('YOLO');
            });
    });

});
