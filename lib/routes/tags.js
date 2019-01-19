const { Router } = require('express');
const Tags = require('../models/Tags');

module.exports = Router()

  .post('/', (req, res) => {
    const { hashtag } = req.body;
    Tags.create({
      hashtag
    }, (err, createdTag) => {
      res.send(createdTag);
    });
  })
  .get('/:id', (req, res) => {
    Tags.findById(req.params.id, (err, foundHash) => {
      res.send(foundHash);
    });
  })
  .get('/', (req, res) => {
    Tags.find((err, hashtags) => {
      res.send(hashtags); 
    });
  })
  .put('/:id', (req, res) => {
    const { hashtag } = req.body;
    Tags.findByIdAndUpdate(req.params.id, { hashtag }, (err, updatedHashtag) => {
      res.send(updatedHashtag);
    });
  })
  .delete('/:id', (req, res) => {
    Tags.findByIdAndDelete(req.params._id, (err, deletedHash) => {
      res.send(deletedHash);
    });
  });
