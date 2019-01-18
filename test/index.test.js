const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/index');

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
    // create an object
    store.create({ name: 'uncle bob' }, (err, createdUncle) => {
      // after done creating -> findById
      store.findById(createdUncle._id, (err, foundUncle) => {
        expect(err).toBeFalsy();
        // after found check that it is the same one that we created
        expect(foundUncle).toEqual({ name: 'uncle bob', _id: createdUncle._id });
        // then call done
        done();
      });
    });
  });

  it('finds all objects tracked by the store', done => {
    // create a bunch of objects (at least 5)
    store.create({ item: 1 }, (err, item1) => {
      store.create({ item: 2 }, (err, item2) => {
        store.create({ item: 3 }, (err, item3) => {
          store.create({ item: 4 }, (err, item4) => {
            store.create({ item: 5 }, (err, item5) => {
              store.find((err, listOfItems) => {
                expect(err).toBeFalsy();
                expect(listOfItems).toHaveLength(5);
                expect(listOfItems).toContainEqual(item1);
                expect(listOfItems).toContainEqual(item2);
                expect(listOfItems).toContainEqual(item3);
                expect(listOfItems).toContainEqual(item4);
                expect(listOfItems).toContainEqual(item5);
                done();
              });
            });
          });
        });
      });
    });
  });

  it('deletes an object with an id', done => {
    // create an item in store
    store.create({ item: 'I am going to delete' }, (err, createdItem) => {
      // -> delete that item
      store.findByIdAndDelete(createdItem._id, (err, createdItem) => {
        expect(err).toBeFalsy();
        // -> -> findById(IdFromCreatedItem)
        store.findById(createdItem._id, (err, foundItem) => {
          // -> -> -> expect(foundItem).toBeFalsy
          expect(err).toBeTruthy();
          expect(foundItem).toBeFalsy();
          done();
        });
      });
    });
  });
  //////////////////////
  it('updates and existing object', done => {
    // store.create
    store.create({ name: 'rayn' }, (err, typoCreated) => {
      // -> store.findByIDAndUpdate(createdObject._id, updatedObject, callback)
      store.findByIdAndUpdate(typoCreated._id, { name: 'ryan' }, (err, updatedWithoutTypo) => {
        // -> -> expect updatedObject returned in callback
        expect(err).toBeFalsy();
        expect(updatedWithoutTypo).toEqual({ name: 'ryan', _id: typoCreated._id });
        // -> -> store.findById(createdObject._id)
        store.findById(typoCreated._id, (err, foundObj) => {
          // -> -> -> expect updatedObject
          expect(foundObj).toEqual(updatedWithoutTypo);
          done();
        });
      });
    });
  });
});