const { Router } = require('express');
const Tags = require('../models/Tags');

module.exports = Router()

  .post('/', (req, res) => {
    const { tag } = req.body;
    Tags.create({ tag }, (err, createdTag) => {
      res.send(createdTag);
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
