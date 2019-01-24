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
  })
  .get('/', (req, res) => {
    Tag.find((err, listOfTags) => {
      res.send(listOfTags);
    });
  })
  .put('/:id', (req, res) => {
    const { name, id } = req.body;
    Tag.findByIdAndUpdate(req.params.id, { name, id }, (err, updatedTag) => {
      res.send(updatedTag);
    });
  })
  .delete('/:id', (req, res) => {
    Tag.findByIdAndDelete(req.params.id, (err, deletedTag) => 
      res.send(deletedTag)
    );
  });
