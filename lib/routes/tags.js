const { Router } = require('express');
const Tags = require('../models/Tag');

module.exports = Router()
  .post('/', (req, res) => {
    const { name } = req.body;
    Tags.create({ name }, (err, createdTag) => {
      res.send(createdTag);
    });
  })
  .get('/:id', (req, res) => {
    Tags.findById(req.params.id, (err, tag) => {
      res.send(tag);
    });
  })
  .put('/:id', (req, res) => {
    const _id = req.params.id;
    const { name } = req.body;
    Tags.findByIdAndUpdate(_id, { name }, (err, updatedTag) => {
      res.send(updatedTag);
    });
  })
  .delete('/:id', (req, res) => {
    Tags.findByIdAndDelete(req.params.id, (err, deletedTag) => {
      res.send(deletedTag);
    });
  })
  .get('/', (req, res) => {
    Tags.find((err, tags) => {
      res.send(tags);
    });
  });
