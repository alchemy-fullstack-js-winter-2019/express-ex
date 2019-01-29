const { Router } = require('express');
const Tags = require('../models/Tag');

module.exports = Router()
  .get('/:id', (req, res) => {
    res.end(req.params.id);
  })
  .get('/', (req, res, next) => {
    Tags.find((err, listOfTags) => {
      if(err) return next(err);
      res.send(listOfTags);
    });
  })
  .post('/', (req, res, next) => {
    Tags.create({
      name: req.body.name
    }, (err, createdTags) => {
      if(err) return next(err);
      res.send(createdTags);
    });
  })
  .put('/:id', (req, res, next) => {
    Tags.findByIdAndUpdate(req.params.id, req.body, (err, foundTag) => {
      if(err) return next(err);
      res.send(foundTag);
    });
  })
  .delete('/:id', (req, res, next) => {
    Tags.findByIdAndDelete(req.params.id, (err, deletedTag) => {
      if(err) return next(err);
      res.send(deletedTag);
    });
  });

