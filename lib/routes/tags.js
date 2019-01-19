const { Router } = require('express');
const Tag = require('../models/Tag');

module.exports = Router()
  .post('/', (req, res) => {
    const { name } = req.body;
    Tag.create({
      name
    }, (err, createdTag) => {
      res.send(createdTag);
    });
  })
  .put('/:id', (req, res) => {
    Tag.findByIdAndUpdate(req.params.id, req.body, (err, updatedTag) => {
      res.send(updatedTag);
    });
  })
  .get('/', (req, res) => {
    Tag.find((err, listOfTags) => {
      res.send(listOfTags);
    });
  })
  .get('/:id', (req, res) => {
    res.end(req.params.id);
  })
  .delete('/:id', (req, res) => {
    Tag.findByIdAndDelete(req.params.id, err => {
      if(err) {
        res.statusCode = 400;
        res.send({ deleted: 0 });
      } else {
        res.send({ deleted: 1 });
      }
    });  
  });
