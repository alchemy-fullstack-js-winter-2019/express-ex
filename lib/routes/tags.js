const { Router } = require('express');
const Tag = require('../models/Tag');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, _id } = req.body;
    Tag.create({
      name,
      _id
    }, (err, createdTag) => {
      if(err) return next(err);
      res.send(createdTag);
    });
  })
  .get('/:id', (req, res, next) => {
    Tag.findById(req.params.id, (err, tag) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, `Bad Id: ${req.params.id}`));
        } else {
          return next(err);
        }
      }
      res.send(tag);
    });
  })
  .get('/', (req, res, next) => {
    Tag.find((err, tags) => {
      if(err) return next(err);
      res.send(tags);
    });
  })
  .put('/:id', (req, res, next) => {
    Tag.findByIdAndUpdate(req.params.id, req.body, (err, updatedTag) => {
      if(err) return next(err);
      res.send(updatedTag);
    });
  })
  .delete('/:id', (req, res, next) => {
    Tag.findByIdAndDelete(req.params.id, (err, deletedTag) => {
      if(err) return next(err);
      res.send(deletedTag);
    });
  });
