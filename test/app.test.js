const app = require('../lib/app');
const request = require('suoertest');

describe('test tweets', () => {
    it('can get tweets', () => {
        return request(app)
            .get('/tweets/abcd')
            .then(res => {
                expect(res.body).toEqual('abcd');
            });
    });
});
