const { Router } = require('express');
const People = require('../../lib/models/People');

module.exports = Router()
  .put('/:id', (req, res, next) => {
    const { name, age, favoriteColor } = req.body;
    People.findByIdAndUpdate(req.params.id, {
      name,
      age,
      favoriteColor
    }, (err, updatedPerson) => {
      if(err) return next(err);
      res.send(updatedPerson);
    });
  })
  .post('/', (req, res, next) => {
    const { name, age, favoriteColor } = req.body;
    People.create({
      name,
      age,
      favoriteColor
    }, (err, createdPeople) => {
      if(err) return next(err);
      res.send(createdPeople);
    });
  })
  .get('/', (req, res, next) => {
    People.find((err, listOfPeople) => {
      if(err) return next(err);
      res.send(listOfPeople);
    });
  })
  .get('/:id', (req, res, next) => {
    if(req.params.id) {
      People.findById(req.params.id, (err, foundPerson) => {
        if(err) return next(err);
        res.send(foundPerson);
      });
    }
  })
  .delete('/:id', (req, res, next) => {
    People.findByIdAndDelete(req.params.id, (err, deletedPerson) => {
      if(err) return next(err);
      res.send(deletedPerson);
    });
  });
