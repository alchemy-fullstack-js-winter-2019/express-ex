const Router = require('express').Router;
const Tags = require('../models/Tag');


module.exports = Router()
  .post('/', (req, res) => {
    const { tag } = req.body;
    Tags.create({
      tag
    }, (err, createdTag) => {
      res.send(createdTag);
    });
  })
  .get('/:id', (req, res) => {
    const id = req.params.id;
    Tags.findById(id, (err, tag) => {
      res.send(tag);
    });
  })
  .get('/', (req, res) => {
    Tags.find((err, listOfTags) => {
      res.send(listOfTags);
    });
  })
  .put('/:id', (req, res) => {
    const id = req.params.id;
    Tags.findByIdAndUpdate(id, req.body, (err, updatedTag) => {
      res.send(updatedTag);
    });
  })
  .delete('/:id', (req, res) => {
    const id = req.params.id;
    Tags.findByIdAndDelete(id, (err, deleteCount) => {
      res.send(deleteCount);
    });
  });
