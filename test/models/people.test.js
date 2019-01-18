const request = require('supertest');
const app = require('../../lib/app');

const mkdirp = require('mkdirp');
const rimraf = require('rimraf'); 

const createPerson = (name) => {
  return request(app)
    .post('/people')
    .send({
      name: name,
      age: 20,
      favoriteColor: 'midnight blue'
    })
    .then(res => res.body);
};
describe('gets people', () => {
  beforeEach(done => {
    rimraf('./data/people', err => {
      done(err);
    });
  });
  beforeEach((done) => {
    mkdirp('./data/people', err => {
      done(err);
    });
  }); 
  it('gets all people', () => {
    const namesToCreate = ['marcy1', 'marcy2', 'marcy3', 'marcy4'];
    return  Promise.all(namesToCreate.map(createPerson))
      .then(() => {
        return request(app)
          .get('/people');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(4);
      });
  });
});
it('gets tweets by ID', () => {
  return createPerson('marcy1')
    .then(personWhoWasCreated => {
      const id = personWhoWasCreated._id;
      return request(app)
        .get(`/people/${id}`)
        .then(res => {
          expect(res.body).toEqual({ name: 'marcy1', age: 20, favoriteColor: 'midnight blue', _id: expect.any(String) });
        });
    });
});
it('finds a tweet by ID and updates it', () => {
  return createPerson('marcy1')
    .then(personWhoWasCreated => {
      const id = personWhoWasCreated._id;
      const updatedObject = ({ name: 'marcy2',
        age: 40,
        favoriteColor: 'blue',
        _id: expect.any(String)
      });
      return request(app) 
        .put(`/people/${id}`)
        .send(updatedObject)
      /* eslint-disable-next-line*/
          .then(res => {
          expect(res.body).toEqual({
            name: 'marcy2',
            age: 40,
            favoriteColor: 'blue',
            _id: expect.any(String)
          });
        });
    });
});
it('deletes a tweet', () => {
  return createPerson('marcy1')
    .then(PersonWhoWasCreated => {
      const id = PersonWhoWasCreated._id;
      return request(app) 
        .delete(`/people/${id}`)
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
});
it('sends a person', () => {
  return request(app)
    .post('/people')
    .send({ name: 'marcy2', age: 20, favoriteColor: 'midnight blue' })
    .then(res => {
      expect(res.body).toEqual({ name: 'marcy2', age: 20, favoriteColor: 'midnight blue', _id: expect.any(String) });
    });
});
