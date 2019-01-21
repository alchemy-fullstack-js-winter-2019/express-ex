const { Router } = require('express');
const Tags = require('../models/Tags');

module.exports = Router()

  .post('/', (req, res) => {
    const { name } = req.body;
    Tags.create({
      name
    }, (err, tagCreated) => {
      res.send(tagCreated);
    });
  })
  .get('/:id', (req, res) => {
    Tags.findById(req.params.id, (err, foundTag) => {
      res.send(foundTag);
    });
  })
  .delete('/:id', (req, res) => {
    Tags.findByIdAndDelete(req.params.id, (err, deleteTag) => {
      res.send(deleteTag);
    });
  })
  .get('/', (req, res) => {
    Tags.find((err, allTags) => {
      res.send(allTags);
    });
  });
