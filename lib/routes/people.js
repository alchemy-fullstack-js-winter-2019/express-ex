const { Router } = require('express');
const People = require('../../lib/models/People');

module.exports = Router()
  .put('/:id', (req, res) => {
    const { name, age, favoriteColor } = req.body;
    People.findByIdAndUpdate(req.params.id, {
      name,
      age,
      favoriteColor
    }, (err, updatedPerson) => {
      res.send(updatedPerson);
    });
  })
  .post('/', (req, res) => {
    const { name, age, favoriteColor } = req.body;
    People.create({
      name,
      age,
      favoriteColor
    }, (err, createdPeople) => {
      res.send(createdPeople);
    });
  })
  .get('/', (req, res) => {
    People.find((err, listOfPeople) => {
      res.send(listOfPeople);
    });
  })
  .get('/:id', (req, res) => {
    if(req.params.id) {
      People.findById(req.params.id, (err, foundPerson) => {
        res.send(foundPerson);
      });
    }
  })
  .delete('/:id', (req, res) => {
    People.findByIdAndDelete(req.params.id, (err, deletedPerson) => {
      res.send(deletedPerson);
    });
  });
