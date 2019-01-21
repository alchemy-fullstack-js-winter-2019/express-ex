const { Router } = require('express');
const Tags = require('../models/Tags');

module.exports = Router()

  .post('/', (req, res) => {
    const { tag } = req.body;
    Tags.create({ tag }, (err, createdTag) => {
      res.send(createdTag);
    });
  })

  .put('/:id', (req, res) => {
    Tags.findByIdAndUpdate(req.params.id, req.body, (err, updatedTag) => {
      res.send(updatedTag);
    });
  })

  .get('/:id', (req, res) => {
    Tags.findById(req.params.id, (err, tag) => {
      res.send(tag);
    });
  })

  .get('/', (req, res) => {
    Tags.find((err, allTags) => {
      res.send(allTags);
    });
  });
