/* eslint-disable no-console */
const { Router } = require('express');
const Tags = require('../models/Tags');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res) => {
    const { group, tag } = req.body;
    Tags.create({ group, tag }, (err, createdTag) => {
      res.send(createdTag);
    });
  })
  .get('/', (req, res) => {
    console.log(req.body);
    Tags.find((err, listOfTags) => {
      res.send(listOfTags);
    });
  })
  .get('/:id', (req, res, next) => {
    Tags.findById(req.params.id, (err, tag) => {
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
  .put('/:id', (req, res, next) => {
    const { group, tag } = req.body;
    Tags.findByIdAndUpdate(req.params.id,
      { group, tag },
      (err, updated) => {
        if(err) return next(err);
        res.send(updated);
      });
  })
  .delete('/:id', (req, res) => {
    Tags.findByIdAndDelete(req.params.id, (err, deletedStatus) => {
      res.send(deletedStatus);
    });
  });