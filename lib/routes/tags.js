const { Router } = require('express');
const Tag = require('../models/Tag');


module.exports = Router()
  .post('/', (req, res) => {
    const { name, _id } = req.body;
    Tag.create({
      name,
      _id
    }, (err, createdTag) => {
      console.log('created tag', createdTag);
      res.send(createdTag);
    });
  }) 

  .get('/', (req, res) => {
    Tag.find((err, tags) => {
      res.send(tags);
    });
  });



  
