const mkdirp = require ('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/models/index');

describe('Store', () => {
  let store = null;
  beforeEach(done => {
    rimraf('./testData/store', err => {
      done(err);
    });
  });
  
  beforeEach(done => {
    mkdirp('./testData/store', err => {
      done(err);
    });
  });
  
  beforeEach(() => {
    store = new Store('./testData/store');
  });

  it('creates an object in my store', done => {
    store.create({ name: 'ryan' }, (err, createdPerson) => {
      expect(err).toBeFalsy();
      expect(createdPerson).toEqual({ name: 'ryan', _id: expect.any(String) });
      done();
    });
  });

  it('finds an object by id', done => {
    store.create({ name: 'sophie' }, (err, createdPerson) => {
      store.findById(createdPerson._id, (err, foundPerson) => {
        expect(err).toBeFalsy();
        expect(foundPerson).toEqual({ name: 'sophie', _id: createdPerson._id });
        done();
      });
    });
  });

  it('find all objects tracked by the store', done => {
    store.create({ name: 'ryan' }, (err, person1) => {
      store.create({ name: 'mariah' }, (err, person2) => {
        store.create({ name: 'kevin' }, (err, person3) => {
          store.create({ name: 'marty' }, (err, person4) => {
            store.create({ name: 'shannon' }, (err, person5) => {
              store.find((err, listOfPeople) => {
                expect(err).toBeFalsy();
                expect(listOfPeople).toHaveLength(5);
                expect(listOfPeople).toContainEqual(person1);
                expect(listOfPeople).toContainEqual(person2);
                expect(listOfPeople).toContainEqual(person3);
                expect(listOfPeople).toContainEqual(person4);
                expect(listOfPeople).toContainEqual(person5);
                done();
              });
            });
          });
        });
      });
    });
  });
  
  it('deletes an object with an id', done => {
    store.create({ person: 'I am going to delete' }, (err, createdPerson) => {
      store.findByIdAndDelete(createdPerson._id, (err, result) => {
        expect(err).toBeFalsy();
        expect(result).toEqual({ deleted:1 });
        store.findById(createdPerson._id, (err, foundPerson) => {
          expect(err).toBeTruthy();
          expect(foundPerson).toBeFalsy();
          done();
        });
      });
    });
  });

  it('updates an existing object', done => {
    store.create({ name: 'meghan' }, (err, typoCreated) => {
      store.findByIdAndUpdate(typoCreated._id, { name: 'megan' }, (err, updatedWithoutTypo) => {
        expect(err).toBeFalsy();
        expect(updatedWithoutTypo).toEqual({ name: 'megan', _id: typoCreated._id });
        store.findById(typoCreated._id, (err, foundPerson) => {
          expect(foundPerson).toEqual(updatedWithoutTypo);
          done();
        });
      });
    });
  });
});
