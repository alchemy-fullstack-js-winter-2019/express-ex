const { Router } = require('express');
const Tag = require('../models/Tag');

module.exports = Router() 
  .post ('/', (req, res) => {
    const { name, id } = req.body;
    Tag.create({
      name,
      id
    }, (err, createdTag) => {
      res.send(createdTag);
    });
  })
  .get('/:id', (req, res) => {
    Tag.findById(req.params.id, (err, foundTag) => {
      res.send(foundTag);
    });
  });
