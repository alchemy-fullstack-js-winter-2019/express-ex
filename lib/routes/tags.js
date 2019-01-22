const { Router } = require('express');
const Tag = require('../models/Tag');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name } = req.body;
    Tag.create({
      name
    }, (err, createdTag) => {
      if(err) return next(err);
      res.send(createdTag);
    });
  })
  .put('/:id', (req, res, next) => {
    Tag.findByIdAndUpdate(req.params.id, req.body, (err, updatedTag) => {
      if(err) return next(err);      
      res.send(updatedTag);
    });
  })
  .get('/', (req, res, next) => {
    Tag.find((err, listOfTags) => {
      if(err) return next(err);
      res.send(listOfTags);
    });
  })
  .get('/:id', (req, res, next) => {
    Tag.findById(req.params.id, (err, tweet) => {
      if(err) return next(err);
      res.send(tweet);
    });
  })
  .delete('/:id', (req, res, next) => {
    Tag.findByIdAndDelete(req.params.id, err => {
      if(err) {
        res.send({ deleted: 0 });
        return next(err);
      }
      else {
        res.send({ deleted: 1 });
      }
    });  
  });
