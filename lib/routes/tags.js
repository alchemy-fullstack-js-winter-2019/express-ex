const { Router } = require('express');
const Tags = require('../models/Tag');

module.exports = Router()
  .get('/:id', (req, res) => {
    res.end(req.params.id);
  })
  .get('/', (req, res) => {
    Tags.find((err, listOfTags) => {
      res.send(listOfTags);
    });
  })
  .post('/', (req, res) => {
    Tags.create({
      name: req.body.name
    }, (err, createdTags) => {
      res.send(createdTags);
    });
  })
  .put('/:id', (req, res) => {
    Tags.findByIdAndUpdate(req.params.id, req.body, (err, foundTag) => {
      res.send(foundTag);
    });
  })
  .delete('/:id', (req, res) => {
    Tags.findByIdAndDelete(req.params.id, (err, deletedTag) => {
      res.send(deletedTag);
    });
  });
