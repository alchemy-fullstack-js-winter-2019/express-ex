const { Router } = require('express');
const Tag = require('../models/Tag');


module.exports = Router()
  .post('/', (req, res) => {
    const { name, _id } = req.body;
    Tag.create({
      name,
      _id
    }, (err, createdTag) => {
      res.send(createdTag);
    });

  });

  
